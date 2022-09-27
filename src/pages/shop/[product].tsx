import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import CheckoutContext from '@/components/CheckoutContext';
import shopify from '@/utils/shopify';

export interface IProductSelection {
  [key: string]: any;
}

const Product = () => {
  const router = useRouter();
  const { product: pidNum } = router.query;
  const [product, setProduct] = React.useState<ShopifyBuy.Product | null>(null);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [currentSelection, setCurrentSelection] =
    React.useState<IProductSelection>({});

  const fetchProductDetails = async (pid: string) => {
    const productDetails = await shopify.product.fetch(pid);
    setProduct(productDetails);
  };

  const checkoutContext = useContext(CheckoutContext);

  const addToCart = async () => {
    const checkout =
      checkoutContext.checkout || (await shopify.checkout.create());
    let VARIANT: string | null = null;
    product?.variants.forEach((variant: ShopifyBuy.ProductVariant) => {
      const options: { name: string; value: string }[] =
        variant.attrs!.selectedOptions;

      for (let i = 0; i < options.length; i += 1) {
        // @ts-ignore
        if (options[i].value !== currentSelection[options[i].name]) {
          return;
        }
      }

      VARIANT = variant.id as string;
    });
    if (!VARIANT) return;
    const lineItemsToAdd = [
      {
        variantId: VARIANT,
        quantity: 1,
      },
    ];
    const newCheckout = await shopify.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    );
    checkoutContext.setCheckout!(newCheckout);
    router.push(newCheckout.webUrl as string, '/checkout');
  };

  useEffect(() => {
    if (!pidNum) return;
    const pid = btoa(`gid://shopify/Product/${pidNum}`);
    fetchProductDetails(pid);
  }, [pidNum]);

  return (
    <div className="relative w-screen rounded-xl border-amber-50/30 bg-amber-50/10 p-8 transition-all lg:h-[600px] lg:w-[700px] lg:border lg:backdrop-blur-sm lg:hover:backdrop-blur-md">
      <button
        className="absolute top-2 left-3 font-mono font-bold transition-all hover:-translate-x-1"
        onClick={() => router.back()}
      >
        {'<-'}
      </button>
      <div className="flex items-center justify-between font-mono text-xl lowercase lg:text-3xl">
        <h1 className="">{product?.title}</h1>
        <h3 className="text-amber-400">{product?.variants[0]?.price}</h3>
      </div>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        <div className="flex w-full flex-col items-center justify-center bg-amber-50 lg:w-1/2">
          <Image
            src={product?.images[imageIndex]!.src || ''}
            alt={product?.title || ''}
            width={500}
            height={500}
            className="mix-blend-multiply"
            draggable={false}
          />
        </div>
        <div className="flex space-x-2 lg:grid lg:flex-none lg:grid-cols-2 lg:gap-2 lg:space-x-0">
          {product?.images.map((image, index) => {
            return (
              <div
                key={`${product.id}-${index}`}
                className="max-h-[50px] max-w-[50px] bg-amber-50"
              >
                <Image
                  src={image.src}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="cursor-pointer mix-blend-multiply"
                  draggable={false}
                  onClick={() => setImageIndex(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            01. Vision
          </h4>
          <p className="text-sm lowercase">{product?.description}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            02. Collection
          </h4>
          <p className="text-sm lowercase">{'Fall/Winter 2022'}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            03. Execution
          </h4>
          <div className="flex">
            <div className="mr-2 space-x-2">
              {product?.options.map((option) => {
                return (
                  <select
                    key={option.name}
                    className="rounded border border-amber-100 bg-amber-100/50 py-[5px] font-mono text-sm lowercase focus:outline-none"
                    onChange={(e) =>
                      setCurrentSelection({
                        ...currentSelection,
                        [option.name]: e.target.value,
                      })
                    }
                    defaultValue="placeholder"
                  >
                    <option disabled value="placeholder">
                      {option.name}
                    </option>
                    {option.values.map(({ value }) => {
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                );
              })}
            </div>
            <button
              disabled={
                product?.options.length !== Object.keys(currentSelection).length
              }
              onClick={addToCart}
              className={clsx(
                'max-w-[150px] rounded-lg  px-3 py-1 font-mono text-sm text-white transition-all',
                {
                  'cursor-not-allowed bg-stone-400':
                    product?.options.length !==
                    Object.keys(currentSelection).length,
                  'bg-amber-300/75 hover:bg-amber-300':
                    product?.options.length ===
                    Object.keys(currentSelection).length,
                }
              )}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
