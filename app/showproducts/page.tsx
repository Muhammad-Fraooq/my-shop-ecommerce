"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "@/types/componentsTypes";

export default function ShowProducts() {
  const { products, setProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!fetched && products.length === 0) {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          if (!res.ok) throw new Error("Failed to fetch products");
          const data = await res.json();
          setProducts(data);
          setFetched(true);
        } catch (err) {
          setError((err as Error).message || "An unknown error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [fetched, setProducts, products.length]);

  const handleDelete = async (id: number) => {
  
    const isAdmin = sessionStorage.getItem("isAdmin"); // Check if user is admin

    if (!isAdmin) {
      // If not admin, show an error and don't allow deletion
      alert("Only admin can delete products.");
      return; // Exit the function if not admin
    }
    try {
      // Admins proceed to delete
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      // Update state after successful deletion
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(
        "An error occurred while deleting the product. Please try again."
      );
      setTimeout(() => setError(null), 3000); // Clear error
    }
  };

  const handleEdit = (product: Product) => {
    sessionStorage.setItem("editProduct", JSON.stringify(product));
    router.push("/add");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-extrabold text-blue-600 text-center">
        Products
      </h1>

      {loading && !fetched && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-500 text-lg font-semibold">
            Fetching products, please wait...
          </p>
        </div>
      )}

      {error && (
        <p className="text-center bg-red-100 text-red-600 border border-red-400 rounded-md px-4 py-2 max-w-lg mx-auto text-lg shadow mt-4">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.id || product.tempId}
            className="bg-white border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-48 w-full flex items-center justify-center p-4 mt-2">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-1">
                Price:{" "}
                <span className="text-green-500 font-semibold">
                  ${product.price}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1 truncate">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-400 mt-2 truncate">
                {product.description}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit className="text-white" />
                </button>
                {/* Conditionally render the delete button for admins only */}
                {sessionStorage.getItem("isAdmin") === "true" && (
                  <button
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
