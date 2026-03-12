import { useState, useEffect, useCallback } from "react";
import productApiService from "../services/product.service.js";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await productApiService.getAll(params);
      setProducts(response.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeatured = useCallback(async () => {
    try {
      const response = await productApiService.getFeatured();
      setFeatured(response.data);
    } catch {
      setFeatured([]);
    }
  }, []);

  const fetchBestSellers = useCallback(async () => {
    try {
      const response = await productApiService.getBestSellers();
      setBestSellers(response.data);
    } catch {
      setBestSellers([]);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await productApiService.getCategories();
      setCategories(response.data);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    fetchFeatured();
    fetchBestSellers();
    fetchCategories();
  }, [fetchAll, fetchFeatured, fetchBestSellers, fetchCategories]);

  return {
    products,
    featured,
    bestSellers,
    categories,
    loading,
    fetchAll,
    fetchFeatured,
    fetchBestSellers,
  };
}
