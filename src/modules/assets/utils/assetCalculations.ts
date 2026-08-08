import type { Asset } from "../types/asset";


export function calculateTotalAssets(
  assets: Asset[]
): number {

  return assets
    .filter(
      (asset) =>
        asset.isIncludedInNetWorth
    )
    .reduce(
      (total, asset) =>
        total + asset.value,
      0
    );

}


export function calculateAssetCount(
  assets: Asset[]
): number {

  return assets.length;

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

  return assets
    .filter(
      (asset) =>
        asset.isIncludedInNetWorth
    )
    .reduce(
      (result, asset) => {

        result[asset.type] =
          (result[asset.type] ?? 0) +
          asset.value;

        return result;

      },
      {} as Record<string, number>
    );

}


export function calculateIncludedAssets(
  assets: Asset[]
): Asset[] {

  return assets.filter(
    (asset) =>
      asset.isIncludedInNetWorth
  );

}


export function calculateExcludedAssets(
  assets: Asset[]
): Asset[] {

  return assets.filter(
    (asset) =>
      !asset.isIncludedInNetWorth
  );

}


export function calculateAssetSnapshot(
  assets: Asset[]
) {

  return {

    totalValue:
      calculateTotalAssets(
        assets
      ),

    assetCount:
      calculateAssetCount(
        assets
      ),

    averageValue:
      calculateAverageAssetValue(
        assets
      ),

    byType:
      calculateAssetsByType(
        assets
      ),

  };

}