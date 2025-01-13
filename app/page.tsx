import Checkout from "./components/Checkout";
import Product from "./components/Product";
import { GET_PRODUCTS, GET_CART_PRODUCTS } from "./product.action";

export default async function Home() {
  const products = await GET_PRODUCTS();
  const cart_products = await GET_CART_PRODUCTS();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl mb-2 font-bold ">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
      <hr />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <section className="flex items-center gap-4">
          <h2 className="text-2xl mb-2 font-bold ">Shopping cart</h2>
          <Checkout />
        </section>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cart_products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
