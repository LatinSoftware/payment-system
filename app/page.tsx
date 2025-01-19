"use client";

import { GET_PRODUCTS, GET_CART_PRODUCTS, ADD_TO_CART, CHECKOUT } from "./product.action";
import { useState, useEffect } from "react";
import Checkout from "./components/Checkout";
import Product from "./components/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products and cart products on mount
    async function fetchData() {
      setLoading(true);
      const products = await GET_PRODUCTS();
      const cart = await GET_CART_PRODUCTS();
      setProducts(products);
      setCartProducts(cart);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddToCart = async (product: Product) => {
    await ADD_TO_CART(product);
    const cart = await GET_CART_PRODUCTS(); // Refresh cart
    setCartProducts(cart);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl mb-2 font-bold">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </div>
      </div>
      <hr />
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <Checkout cartProducts={cartProducts} />
      </div>
    </div>
  );
}
