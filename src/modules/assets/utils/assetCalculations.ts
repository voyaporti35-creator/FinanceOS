import type { Asset } from "../types/asset";


export function calculateTotalAssets(
  assets: Asset[]
): number {
  return assets
    .filter((asset) => asset.isIncludedInNetWorth)
    .reduce(
      (total, asset) =>
        total + asset.currentValue,
      0
    );
}


export function calculateAssetCount(
  assets: Asset[]
): number {
  return assets.length;
}


export function calculateAssetGain(
  asset: Asset
): number {
  return (
    asset.currentValue -
    asset.purchaseValue
  );
}


export function calculateTotalGain(
  assets: Asset[]
): number {
  return assets.reduce(
    (total, asset) =>
      total + calculateAssetGain(asset),
    0
  );
}


export function calculateAssetGainPercentage(
  asset: Asset
): number {

  if (asset.purchaseValue === 0) {
    return 0;
  }

  return (
    (asset.currentValue - asset.purchaseValue) /
    asset.purchaseValue
  );
}


export function calculateAverageAssetValue(
  assets: Asset[]
): number {

  if (assets.length === 0) {
    return 0;
  }

  return (
    calculateTotalAssets(assets) /
    assets.length
  );
}


export function calculateAssetsByType(
  assets: Asset[]
): Record<string, number> {

  return assets.reduce(
    (result, asset) => {

      result[asset.type] =
        (result[asset.type] ?? 0) +
        asset.currentValue;

      return result;

    },
    {} as Record<string, number>
  );
}