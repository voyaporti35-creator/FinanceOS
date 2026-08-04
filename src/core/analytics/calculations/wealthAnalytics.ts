import type { WealthAnalytics } from "../models";

export function calculateWealthAnalytics(
  totalAssets: number,
  totalLiabilities: number
): WealthAnalytics {
  return {
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
  };
}