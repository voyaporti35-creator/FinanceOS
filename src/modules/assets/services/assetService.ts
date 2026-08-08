import { db } from "../../../db/database";
import type { Asset } from "../types/asset";

export const assetService = {

  async create(
    asset: Omit<
      Asset,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<Asset> {

    const now = Date.now();

    const newAsset: Asset = {

      id: crypto.randomUUID(),

      createdAt: now,

      updatedAt: now,

      ...asset,

    };

    await db.assets.add(
      newAsset
    );

    return newAsset;

  },

  async update(
    asset: Asset
  ): Promise<void> {

    const updated =
      await db.assets.update(
        asset.id,
        {

          ...asset,

          updatedAt: Date.now(),

        }
      );

    if (updated === 0) {

      throw new Error(
        "El activo no existe"
      );

    }

  },

  async delete(
    id: string
  ): Promise<void> {

    await db.assets.delete(id);

  },

  async getById(
    id: string
  ): Promise<Asset | undefined> {

    return db.assets.get(id);

  },

  async getAll(): Promise<Asset[]> {

    return db.assets
      .orderBy("createdAt")
      .toArray();

  },

  async exists(
    id: string
  ): Promise<boolean> {

    return (
      (await db.assets.get(id))
      !== undefined
    );

  },

  async clear(): Promise<void> {

    await db.assets.clear();

  },

};