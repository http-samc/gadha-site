import { createContext } from 'react';
import type ShopifyBuy from 'shopify-buy';

interface ICheckoutContext {
  checkout?: ShopifyBuy.Cart;
  cart?: {
    variant?: string;
    quantity?: number;
  }[];
}

const CheckoutContext = createContext<ICheckoutContext>({});

export default CheckoutContext;
