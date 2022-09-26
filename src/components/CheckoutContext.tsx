import { createContext } from 'react';
import type ShopifyBuy from 'shopify-buy';

interface ICheckoutContext {
  checkout: ShopifyBuy.Cart | null;
  setCheckout?: ((checkout: ShopifyBuy.Cart) => void) | null;
  cart?: {
    variant?: string;
    quantity?: number;
  }[];
}

const CheckoutContext = createContext<ICheckoutContext>({
  checkout: null,
  setCheckout: null,
});

export default CheckoutContext;
