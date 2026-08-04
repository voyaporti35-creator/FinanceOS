import { useEffect } from "react";
import { useAssetStore } from "../store/assetStore";

export function useAssets() {
  const assets = useAssetStore((state) => state.assets);
  const isLoading = useAssetStore((state) => state.isLoading);
  const error = useAssetStore((state) => state.error);

  const loadAssets = useAssetStore((state) => state.loadAssets);
  const createAsset = useAssetStore((state) => state.createAsset);
  const updateAsset = useAssetStore((state) => state.updateAsset);
  const deleteAsset = useAssetStore((state) => state.deleteAsset);
  const clearAssets = useAssetStore((state) => state.clearAssets);

  useEffect(() => {
    void loadAssets();
  }, [loadAssets]);

  return {
    assets,
    isLoading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
    clearAssets,
  };
}