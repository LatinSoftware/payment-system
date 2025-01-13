"use client";
import { ADD_TO_CART } from "../product.action";

export default function Product({ product }: { product: Product }) {

  const addToCart = async () => {
    await ADD_TO_CART(product);
  }  

  return (
    <div key={product.id} className="group">
      <img
        alt={product.imageAlt}
        src={product.imageSrc}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
      />
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price.amount}</p>
      <button
        onClick={addToCart}
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Add to cart
      </button>
    </div>
  );
}
