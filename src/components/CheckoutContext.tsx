import { createContext } from 'react';

interface ICheckoutContext {
  checkout?: string;
  card?: string;
  cart_contents?: {
    variant?: string;
    quantity?: number;
  }[];
}

const CheckoutContext = createContext<ICheckoutContext>({});

export default CheckoutContext;
