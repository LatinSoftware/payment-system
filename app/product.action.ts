"use server";

import stripe from "./StripeCustom";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let cart_products: Product[] = [];

export async function GET_PRODUCTS() {
  console.log("GET_PRODUCTS");
  var response = await stripe.products.list();

  var products = await Promise.all(response.data.map(async (product) => {
    const prices = await stripe.prices.search({
      query: `product: '${product.id}'`,
    });

    const price = prices.data[0];

    const amount = (price.unit_amount ?? 0) / 100

    const product_obj: Product = {
      id: product.id,
      name: product.name,
      href: product.url,
      price: {
        id: price.id,
        amount: amount,
      },
      imageSrc: product.images[0],
      imageAlt: product.name,
    };

    return product_obj;
  }));

  return products;
}

export async function GET_CART_PRODUCTS() {
  return cart_products;
}

export async function ADD_TO_CART(product: Product) {
  cart_products.push(product);
  // products.splice(products.indexOf(product), 1);
  revalidatePath("/");
}

export async function CHECKOUT() {
  console.log("CHECKOUT");

  const session = await stripe.checkout.sessions.create({
    line_items: cart_products.map(({price}) => ({price: price.id, quantity: 1})),
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
  });

  if (!session.url) return;

  cart_products = [];

  redirect(session.url);
}