import { createContext, useEffect, useState, useContext } from "react";
import { supabaseProducts } from "../config/supabase";

const ProductsDataContext = createContext();

const ProductsDataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the products data from Supabase
  const getProductsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabaseProducts.getAll();

      if (fetchError) {
        console.error("Error fetching products from Supabase:", fetchError);
        setError(fetchError.message);
        return;
      }

      // Transform Supabase data to match expected frontend format
      const transformedData = data.map(product => ({
        ...product,
        // Map snake_case from DB to camelCase for frontend
        originalPrice: product.original_price,
        isOutOfStock: product.is_out_of_stock,
        isTrending: product.is_trending,
      }));

      setProductsData(transformedData);
    } catch (error) {
      console.error("Error in fetching Products from Supabase:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch the products data when the component mounts
  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <ProductsDataContext.Provider value={{ productsData, loading, error, refetch: getProductsData }}>
      {children}
    </ProductsDataContext.Provider>
  );
};

// Custom hook to consume the ProductsDataContext
const useProductsData = () => useContext(ProductsDataContext);

export { useProductsData, ProductsDataProvider };
