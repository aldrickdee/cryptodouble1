import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export const walletAddresses = {
  solana: "5GJLPiZ3nsVgdxj6zHgcNaJaziQMWhq3apCxeHjZgDwK",
  sui: "0x7f82bac955800413a789f5d066194975ca793539867ebbf8b7038f560314b109"
};

export function calculateDouble(amount: number): number {
  return amount * 2;
}
