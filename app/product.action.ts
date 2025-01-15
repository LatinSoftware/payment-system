"use server";

import stripe from "./StripeCustom";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let cart_products: Product[] = [];

export async function GET_PRODUCTS() {
  console.log("GET_PRODUCTS");
  var response = await stripe.products.list();

  // var products = await Promise.all(response.data.map(async (product) => {
  //   const prices = await stripe.prices.search({
  //     query: `product: '${product.id}'`,
  //   });

  //   const price = prices.data[0];

  //   const amount = (price.unit_amount ?? 0) / 100

  //   const product_obj: Product = {
  //     id: product.id,
  //     name: product.name,
  //     href: product.url,
  //     price: {
  //       id: price.id,
  //       amount: amount,
  //     },
  //     imageSrc: product.images[0],
  //     imageAlt: product.name,
  //   };

  //   return product_obj;
  // }));

  // console.log(products);

  var products = [
    {
      id: 'prod_RVA9cGfrjqIq0l',
      name: 'Classic Virgin Pina Colada',
      href: null,
      price: { id: 'price_1Qc9p6GGs74eAK9s4IgelSSK', amount: 5.5 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfRnUya1ZKTTlvZGhObWRHMFBFaDhIWThL00tGAkEjw8',
      imageAlt: 'Classic Virgin Pina Colada'
    },
    {
      id: 'prod_RVA7tTVQmU3sqv',
      name: 'Spicy Mango Margarita',
      href: null,
      price: { id: 'price_1Qc9nQGGs74eAK9sFDO4KnPt', amount: 9 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfVlRrd01LbVF6aHdaS2FkTWJydXBiaU9w00WJuMZkrH',
      imageAlt: 'Spicy Mango Margarita'
    },
    {
      id: 'prod_RVA6pzJAO1ZDc5',
      name: 'Berry Bliss Smoothie',
      href: null,
      price: { id: 'price_1Qc9lxGGs74eAK9sK4nLdpM7', amount: 6 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfUXJrbHpMejYwSTBneFRoV0JiUzVEWkZV006mrYWYjh',
      imageAlt: 'Berry Bliss Smoothie'
    },
    {
      id: 'prod_RVA4SFPUl04iFC',
      name: 'Sunrise Mojito',
      href: null,
      price: { id: 'price_1Qc9kSGGs74eAK9s7a7Z4GIB', amount: 7.5 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfODF6VUVhTUR5MW1pcE1MWDFyRlVxZlZK00MJHnPQnB',
      imageAlt: 'Sunrise Mojito'
    },
    {
      id: 'prod_RVA1kKzF7C4Kch',
      name: 'chocolate caliente',
      href: null,
      price: { id: 'price_1Qc9hBGGs74eAK9sKFDYVUVQ', amount: 5 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfaUZZRkRNc2JubVJNamdweWNOVnlLNU9M00pa8ZJs92',
      imageAlt: 'chocolate caliente'
    },
    {
      id: 'prod_RPaKtSYke2wBvZ',
      name: 'Sunglasses',
      href: null,
      price: { id: 'price_1QWlAHGGs74eAK9sLyaGYm3G', amount: 30 },
      imageSrc: 'https://files.stripe.com/links/MDB8YWNjdF8xUVdkeWFHR3M3NGVBSzlzfGZsX3Rlc3RfdlE2UkdxMHE1RE9zVm16dVVxTVJtZlpX00wAgILdWo',
      imageAlt: 'Sunglasses'
    }
  ]

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