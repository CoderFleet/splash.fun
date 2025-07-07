export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
}

export interface LaunchFormInputs {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  image: File | null;
}

export interface TokenLaunchResult {
  mintAddress: string;
  tokenAccount: string;
  signatures: string[];
}