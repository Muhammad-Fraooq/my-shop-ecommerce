"use client";

import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AddProduct() {
  const { setProducts } = useProducts();
  const [product, setProduct] = useState({
    id: null,
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const adminCredentials = {
    name: "Muhammad Farooq",
    password: "Muhammad2007",
  };

  // Check admin session on component load
  useEffect(() => {
    const isAdminSession = sessionStorage.getItem("isAdmin");
    if (isAdminSession === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = () => {
    if (!name || !password) {
      setLoginError("Please provide both admin name and password.");
      return;
    }

    if (
      name === adminCredentials.name &&
      password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setLoginError(null);
      sessionStorage.setItem("isAdmin", "true"); // Store admin session
    } else {
      setLoginError("Invalid admin credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin"); // Clear admin session
    setIsAdmin(false);
    router.push("/add"); // Redirect to home or login page
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setMessage("Unauthorized action.");
      return;
    }

    setLoading(true);

    const price = parseFloat(product.price);
    const tempId = product.id || Date.now();

    const productData = {
      id: tempId,
      title: product.title,
      category: product.category,
      price,
      description: product.description,
      image: product.image,
    };

    const apiUrl = product.id
      ? `https://fakestoreapi.com/products/${product.id}`
      : "https://fakestoreapi.com/products";
    const method = product.id ? "PUT" : "POST";

    try {
      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error("Failed to save product.");
      }

      const data = await res.json();

      setProducts((prev) =>
        product.id
          ? prev.map((item) => (item.id === product.id ? data : item))
          : [...prev, { ...productData, id: data.id || tempId }]
      );

      router.push("/showproducts");
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {!isAdmin ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-3xl mb-4 font-extrabold text-blue-600 text-center">
            Admin Login
          </h2>

          {loginError && (
            <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">
              {loginError}
            </p>
          )}
          <input
            type="text"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handleAdminLogin}
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl pt-16">
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 focus:outline-none"
          >
            Logout
          </button>
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl ">
            <button
              onClick={() => router.push("/showproducts")}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-4 focus:outline-none"
            >
              Back to Products
            </button>

            <h1 className="text-3xl mb-4 font-extrabold text-blue-600 text-center">
              {product.id ? "Edit Product" : "Add New Product"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={product.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={product.image}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className={`w-full py-2 rounded-md ${
                  loading
                    ? "bg-yellow-500 cursor-not-allowed"
                    : product.id
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={loading}
              >
                {
                  loading
                    ? "Saving..."
                    : product.id
                    ? "Update Product" // Text for editing a product
                    : "Add Product" // Text for adding a new product
                }
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 p-2 rounded-md ${
                  message.includes("success")
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
