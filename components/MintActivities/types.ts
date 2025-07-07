export interface MintActivity {
  time: string
  type: "INFO" | "MINT" | "TXN" | "ERROR"
  hash?: string
  amount?: string
  token?: string
  status?: string
  message?: string
}