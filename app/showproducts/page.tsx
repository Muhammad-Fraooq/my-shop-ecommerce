"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  tempId?: string;
}

export default function ShowProducts() {
  const { products, setProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null); // Unauthorized error
  const [fetched, setFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const router = useRouter();

  useEffect(() => {
    const adminCredentials = {
      name: "Muhammad Farooq",
      password: "Muhammad2007",
    };

    const storedName = sessionStorage.getItem("adminName");
    const storedPassword = sessionStorage.getItem("adminPassword");

    if (
      storedName === adminCredentials.name &&
      storedPassword === adminCredentials.password
    ) {
      setIsAdmin(true);
    }
  }, []);

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
    if (!isAdmin) {
      setAdminError("Only an admin can delete products.");
      setTimeout(() => setAdminError(null), 3000); // Clear error after 3 seconds
      return;
    }

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    sessionStorage.setItem("editProduct", JSON.stringify(product));
    router.push("/add");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminName");
    sessionStorage.removeItem("adminPassword");
    setIsAdmin(true); // Reset isAdmin to false on logout
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-extrabold text-blue-600 text-center">Products</h1>

      {loading && !fetched && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-500 text-lg font-semibold">
            Fetching products, please wait...
          </p>
        </div>
      )}

      {error && (
        <p className="text-center bg-red-100 text-red-600 border border-red-400 rounded-md px-4 py-2 max-w-lg mx-auto text-lg shadow">
          {error}
        </p>
      )}

      {adminError && (
        <p className="text-center bg-yellow-100 text-yellow-600 border border-yellow-400 rounded-md px-4 py-2 max-w-lg mx-auto text-lg shadow mt-4">
          {adminError}
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
                {/* Delete button is always visible for both admin and user */}
                {isAdmin && (
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

      {/* Logout button for admin */}
      {/* {isAdmin && ( */}
      <div className="text-center mt-8">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
      {/* // )} */}
    </div>
  );
}
