import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export const walletAddresses = {
  xrp: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  sui: "0x5c1e88b39e6374a6a246332afc02d3d7c521fc31"
};

export function calculateDouble(amount: number): number {
  return amount * 2;
}
