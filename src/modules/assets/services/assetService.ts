import { db } from "../../../db/database";
import type { Asset } from "../types/asset";


export const assetService = {

  async create(
    asset: Omit<Asset, "id" | "createdAt" | "updatedAt">
  ): Promise<Asset> {

    const newAsset: Asset = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...asset,
    };

    await db.assets.add(newAsset);

    return newAsset;
  },


  async update(
    asset: Asset
  ): Promise<void> {

    await db.assets.update(
      asset.id,
      {
        ...asset,
        updatedAt: Date.now(),
      }
    );
  },


  async delete(
    id: string
  ): Promise<void> {

    await db.assets.delete(id);
  },


  async getAll(): Promise<Asset[]> {

    return db.assets.toArray();
  },


  async getById(
    id: string
  ): Promise<Asset | undefined> {

    return db.assets.get(id);
  },


  async clear(): Promise<void> {

    await db.assets.clear();

  },

};