import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  pack,
  TokenMetadata as SplTokenMetadata,
} from "@solana/spl-token-metadata";
import { pinFileToIPFS } from "@/lib/pinata/pinata";
import { TokenMetadata, LaunchFormInputs } from "@/lib/types/token";
import { useMintLog } from "@/contexts/MintLogContext";

export async function createTokenMetadata(
  data: LaunchFormInputs
): Promise<string> {
  let cid = "";
  if (data.image) {
    cid = await pinFileToIPFS(data.image);
  }

  const metadataJson: TokenMetadata = {
    name: data.name,
    symbol: data.symbol,
    description: `A utility token called ${data.name}`,
    image: cid ? `https://gateway.pinata.cloud/ipfs/${cid}` : "",
    external_url: "",
  };

  const blob = new Blob([JSON.stringify(metadataJson)], {
    type: "application/json",
  });
  const file = new File([blob], "metadata.json");
  const metadataCid = await pinFileToIPFS(file);

  return `https://gateway.pinata.cloud/ipfs/${metadataCid}`;
}

export async function launchToken(
  data: LaunchFormInputs,
  connection: Connection,
  wallet: { publicKey: PublicKey | null; sendTransaction: Function },
  log: ReturnType<typeof useMintLog>["log"]
) {
  const time = () => new Date().toISOString();
  if (!wallet.publicKey) {
    log({
      time: time(),
      type: "ERROR",
      status: "Wallet not connected",
    });
    throw new Error("Wallet not connected");
  }

  log({ time: time(), type: "INFO", message: "Pinning metadata to IPFS..." });

  const metadataUri = await createTokenMetadata(data);

  log({
    time: time(),
    type: "INFO",
    message: `Metadata pinned at: ${metadataUri}`,
  });

  const mintKeypair = Keypair.generate();

  log({
    time: time(),
    type: "MINT",
    hash: mintKeypair.publicKey.toBase58(),
    message: "Generated mint keypair",
  });

  const metadata: SplTokenMetadata = {
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

  log({ time: time(), type: "TXN", status: "Creating Mint Account" });

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

  const sig1 = await wallet.sendTransaction(transaction, connection);
  log({
    time: time(),
    type: "TXN",
    hash: sig1,
    status: "Mint Account Created",
  });

  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);

  const associatedToken = getAssociatedTokenAddressSync(
    mintKeypair.publicKey,
    wallet.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const transaction2 = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      associatedToken,
      wallet.publicKey,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID
    )
  );

  const sig2 = await wallet.sendTransaction(transaction2, connection);
  log({
    time: time(),
    type: "TXN",
    hash: sig2,
    status: "Created Associated Token Account",
  });

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

  const sig3 = await wallet.sendTransaction(transaction3, connection);

  const actualSupply = data.supply / Math.pow(10, data.decimals);

  log({
    time: time(),
    type: "MINT",
    hash: sig3,
    amount: actualSupply.toLocaleString(),
    token: data.symbol,
    status: "Minted tokens to wallet",
  });

  log({
    time: time(),
    type: "INFO",
    message: `Mint complete at: ${mintKeypair.publicKey.toBase58()}`,
  });

  console.log(`Minted ${actualSupply} tokens to:`, associatedToken.toBase58());

  return {
    mintAddress: mintKeypair.publicKey.toBase58(),
    tokenAccount: associatedToken.toBase58(),
  };
}
