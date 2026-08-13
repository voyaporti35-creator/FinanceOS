import { useEffect } from "react";
import { useCategoryStore } from "../store/categoryStore";

export function useCategories() {
  const categories = useCategoryStore((state) => state.categories);
  const isLoading = useCategoryStore((state) => state.isLoading);
  const error = useCategoryStore((state) => state.error);

  const loadCategories = useCategoryStore(
    (state) => state.loadCategories
  );

  const createCategory = useCategoryStore(
    (state) => state.createCategory
  );

  const updateCategory = useCategoryStore(
    (state) => state.updateCategory
  );

  const deleteCategory = useCategoryStore(
    (state) => state.deleteCategory
  );

  const ensureSystemCategories = useCategoryStore(
    (state) => state.ensureSystemCategories
  );

  const cleanupDuplicates = useCategoryStore(
    (state) => state.cleanupDuplicates
  );

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    ensureSystemCategories,
    cleanupDuplicates,
  };
}