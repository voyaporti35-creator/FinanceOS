import { create } from "zustand";
import { assetService } from "../services/assetService";
import type { Asset } from "../types/asset";

interface AssetStoreState {
  assets: Asset[];
  isLoading: boolean;
  error: string | null;

  loadAssets: () => Promise<void>;

  createAsset: (
    asset: Omit<Asset, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;

  updateAsset: (asset: Asset) => Promise<void>;

  deleteAsset: (id: string) => Promise<void>;

  clearAssets: () => Promise<void>;
}

export const useAssetStore = create<AssetStoreState>((set) => ({
  assets: [],

  isLoading: false,

  error: null,

  loadAssets: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const assets = await assetService.getAll();

      set({
        assets,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los activos.",
        isLoading: false,
      });
    }
  },

  createAsset: async (asset) => {
    try {
      const created = await assetService.create(asset);

      set((state) => ({
        assets: [created, ...state.assets],
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo crear el activo.",
      });
    }
  },

  updateAsset: async (asset) => {
    try {
      await assetService.update(asset);

      set((state) => ({
        assets: state.assets.map((item) =>
          item.id === asset.id ? asset : item
        ),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo actualizar el activo.",
      });
    }
  },

  deleteAsset: async (id) => {
    try {
      await assetService.delete(id);

      set((state) => ({
        assets: state.assets.filter((item) => item.id !== id),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo eliminar el activo.",
      });
    }
  },

  clearAssets: async () => {
    try {
      await assetService.clear();

      set({
        assets: [],
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron eliminar los activos.",
      });
    }
  },
}));