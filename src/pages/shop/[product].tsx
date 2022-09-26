import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import shopify from '@/utils/shopify';

export interface IProductSelection {
  color?: string;
  size?: string;
  variant?: string;
  imageIndex: number;
}

const Product = () => {
  const router = useRouter();
  const { product: pidNum } = router.query;
  const pid = btoa(`gid://shopify/Product/${pidNum}`);
  const [product, setProduct] = React.useState<ShopifyBuy.Product | null>(null);
  const [currentSelection, setCurrentSelection] =
    React.useState<IProductSelection>({ imageIndex: 0 });

  const fetchProductDetails = async () => {
    const productDetails = await shopify.product.fetch(pid as string);
    setProduct(productDetails);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="w-screen rounded-xl border border-amber-50/30 p-8 backdrop-blur-sm transition-all hover:backdrop-blur-md lg:h-[600px] lg:w-[700px]">
      <div className="flex items-center justify-between font-mono text-xl lowercase lg:text-3xl">
        <h1 className="">{product?.title || <Skeleton />}</h1>
        <h3 className="text-amber-400">
          {product?.variants[0]?.price || <Skeleton />}
        </h3>
      </div>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        <div className="flex w-full flex-col items-center justify-center bg-amber-50 lg:w-1/2">
          <Image
            src={product?.images[currentSelection.imageIndex]!.src || ''}
            alt={product?.title || ''}
            width={500}
            height={500}
            className="mix-blend-multiply"
            draggable={false}
          />
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
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
                  onClick={() =>
                    setCurrentSelection({
                      ...currentSelection,
                      imageIndex: index,
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            01. Vision
          </h4>
          <p className="text-sm lowercase">
            {product?.description || <Skeleton count={3} />}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            02. Collection
          </h4>
          <p className="text-sm lowercase">
            {'Fall/Winter 2022' || <Skeleton />}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">
          <h4 className="text-lg font-bold lowercase lg:min-w-[320px] lg:text-xl">
            03. Execution
          </h4>
          <button className="max-w-[150px] rounded-lg bg-amber-300/75 px-3 py-1 font-mono text-sm text-white transition-all hover:bg-amber-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
