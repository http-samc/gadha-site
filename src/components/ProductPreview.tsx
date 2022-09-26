import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import getColorSwatch from '@/utils/get-color-swatch';

const ProductPreview = (product: ShopifyBuy.Product) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/shop/${(product.id as string).split('/').pop()}`)
      }
      className="relative h-[250px] w-[200px] cursor-pointer flex-col items-center rounded bg-amber-50 p-4 transition-all lg:hover:scale-[1.05]"
    >
      <div className="absolute top-0 right-0 z-10 rounded bg-amber-200 px-4">
        <p className="text-center font-semibold uppercase">
          {product.variants[0]?.price!.split('.')[0]}
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src={product.images[currentImage]!.src}
          alt={product.title}
          width={150}
          height={150}
          className="mix-blend-multiply"
          onClick={() =>
            setCurrentImage((prev) => (prev + 1) % product.images.length)
          }
          draggable={false}
        />
      </div>
      <h4 className="font-mono text-sm lowercase">{product.title}</h4>
      <div className="mt-1 flex w-full flex-wrap items-center justify-start space-x-2">
        {product.options.map((option) => {
          if (option.name === 'Size') {
            return (
              <p key={`${product.id}-size`} className="font-sans text-sm">
                {option.values[0]?.value}
                {' – '}
                {option.values[option.values.length - 1]?.value}
              </p>
            );
          }
          if (option.name === 'Color') {
            return (
              <div
                key={`${product.id}-color`}
                className="flex flex-row space-x-[0.25rem]"
              >
                {option.values.map((value) => {
                  return (
                    <span
                      key={`${product.id}-${value.value}`}
                      className="h-5 w-5 rounded-full border border-stone-400"
                      style={{
                        backgroundColor: getColorSwatch(value.value),
                      }}
                    />
                  );
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductPreview;
