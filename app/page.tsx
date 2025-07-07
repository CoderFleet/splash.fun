"use client";

import TokenImageDropzone from "@/components/Input/ImageDropzone";
import MintActivities from "@/components/MintActivities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaunchFormInputs, launchFormSchema } from "@/lib/utils/validators";
import { pinFileToIPFS } from "@/lib/pinata/pinata";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createAccount,
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  getMintLen,
  LENGTH_SIZE,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LaunchFormInputs>({
    resolver: zodResolver(launchFormSchema),
  });

  const { connection } = useConnection();
  const wallet = useWallet();

  const onSubmit = async (data: LaunchFormInputs) => {
    console.log("Valid Form Data:", data);

    try {
      console.log("Form data:", data);

      let cid = "";
      if (data.image) {
        cid = await pinFileToIPFS(data.image);
        console.log(`https://gateway.pinata.cloud/ipfs/${cid}`);
        console.log(`ipfs://${cid}`);
      }

      const metadataJson = {
        name: data.name,
        symbol: data.symbol,
        description: `A utility token called ${data.name}`,
        image: `https://gateway.pinata.cloud/ipfs/${cid}`,
        external_url: "", // or your custom site
      };

      const blob = new Blob([JSON.stringify(metadataJson)], {
        type: "application/json",
      });
      const file = new File([blob], "metadata.json");
      const metadataCid = await pinFileToIPFS(file);

      const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataCid}`;

      const mintKeypair = Keypair.generate();

      const metadata: TokenMetadata = {
        mint: mintKeypair.publicKey,
        name: data.name,
        symbol: data.symbol,
        uri: metadataUri,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      if (!wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          data.decimals,
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction, connection);
      console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log(associatedToken.toBase58());

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          BigInt(data.supply),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction3, connection);

      const actualSupply = data.supply / Math.pow(10, data.decimals);
      console.log(
        `Minted ${actualSupply} tokens to:`,
        associatedToken.toBase58()
      );
    } catch (err) {
      console.log("Error!!!", err);
    }
  };
  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <div className="flex flex-col h-full justify-between ">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-8xl font-bold text-white">L</div>
              <p className="text-2xl text-gray-400 font-light">
                No KYC. No Lambo. Just splash.
              </p>
            </div>
          </div>
          <MintActivities />
        </div>

        {/* Right Side - Token Creation Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black-custom border border-[#f4388d64] rounded-2xl p-8 space-y-6 shadow-[0px_0px_13px_-2px_#f4388d]">
          {/* Token Name */}
          <div className="space-y-2">
            <Label htmlFor="tokenName" className="text-gray-300 text-sm">
              Token Name
            </Label>
            <Input
              id="tokenName"
              {...register("name")}
              placeholder="Splash Coin"
              className="bg-black border-[#f4388d] text-white rounded-lg h-12 px-4"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* Token Symbol */}
          <div className="space-y-2">
            <Label htmlFor="tokenSymbol" className="text-gray-300 text-sm">
              Token Ticker
            </Label>
            <Input
              id="tokenSymbol"
              {...register("symbol")}
              placeholder="SPLSH"
              className="bg-black border-cyan-500 text-white rounded-lg h-12 px-4 focus:border-cyan-400"
            />
            {errors.symbol && (
              <p className="text-red-500">{errors.symbol.message}</p>
            )}
          </div>

          {/* Decimals and Supply */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimals" className="text-gray-300 text-sm">
                Decimals
              </Label>
              <Input
                id="decimals"
                placeholder="9"
                type="number"
                {...register("decimals", { valueAsNumber: true })}
                className="bg-black border-green-500 text-white rounded-lg h-12 px-4 focus:border-green-400"
              />
              {errors.decimals && (
                <p className="text-red-500">{errors.decimals.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="supply" className="text-gray-300 text-sm">
                Supply
              </Label>
              <Input
                id="supply"
                placeholder="1000000000"
                type="number"
                {...register("supply", { valueAsNumber: true })}
                className="bg-black border-green-500 text-white rounded-lg h-12 px-4 focus:border-green-400"
              />
              {errors.supply && (
                <p className="text-red-500">{errors.supply.message}</p>
              )}
            </div>
          </div>

          {/* Token Image Upload */}
          {/* <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Token Image</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center space-y-4 hover:border-gray-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <div className="space-y-1">
                  <p className="text-pink-400 font-medium">Click to upload</p>
                  <p className="text-gray-400 text-sm">or drag and drop</p>
                  <p className="text-gray-500 text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              </div>
            </div> */}
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange } }) => (
              <TokenImageDropzone onFileAccepted={onChange} />
            )}
          />
          {errors.image?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.image.message)}
            </p>
          )}
          {/* <TokenImageDropzone /> */}

          {/* Launch Button */}
          <Button
            type="submit"
            className="w-full relative bg-black border-2 border-transparent p-[2px] rounded-full overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 animate-pulse"></div>
            <span className="relative bg-black text-white font-semibold py-5 px-6 rounded-full w-full block group-hover:bg-gray-900 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-green-400 group-hover:to-pink-400">
              LAUNCH MY TOKEN
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
