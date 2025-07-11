"use client";

import TokenImageDropzone from "@/components/Input/ImageDropzone";
import MintActivities from "@/components/MintActivities/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaunchFormInputs, launchFormSchema } from "@/lib/utils/validators";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { launchToken } from "@/lib/solana/tokenService";
import { useRouter } from "next/navigation";
import { useMintLog } from "@/contexts/MintLogContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    mintAddress: string;
    tokenAccount: string;
  } | null>(null);

  const router = useRouter();

  const { log, clear } = useMintLog();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LaunchFormInputs>({
    resolver: zodResolver(launchFormSchema),
  });

  const { connection } = useConnection();
  const wallet = useWallet();

  const onSubmit = async (data: LaunchFormInputs) => {
    // console.log("Valid Form Data:", data);
    clear();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Valid Form Data:", data);

      const result = await launchToken(data, connection, wallet, log);

      setSuccess(result);
      router.push(
        `/splashsuccess?name=${encodeURIComponent(data.name)}&mintAddress=${
          result.mintAddress
        }&tokenAccount=${result.tokenAccount}`
      );
      console.log("Token launched successfully:", result);
      reset();
    } catch (err) {
      console.error("Error launching token:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      log({
        time: new Date().toISOString(),
        type: "ERROR",
        status: (err as Error).message || "Unknown error",
      });
      reset();
    } finally {
      reset();
      setIsLoading(false);
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
            disabled={isLoading}
            className="w-full relative bg-black border-2 border-transparent p-[2px] rounded-full overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 animate-pulse"></div>
            <span className="relative bg-black text-white font-semibold py-5 px-6 rounded-full w-full block group-hover:bg-gray-900 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-green-400 group-hover:to-pink-400">
              {isLoading ? "LAUNCHING..." : "LAUNCH MY TOKEN"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
