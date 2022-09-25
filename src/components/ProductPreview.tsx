import Image from 'next/image';
import React from 'react';

import getColorSwatch from '@/utils/get-color-swatch';

const ProductPreview = (product: ShopifyBuy.Product) => {
  return (
    <div className="h-[250px] w-[200px] flex-col items-center rounded bg-amber-50 p-4">
      <div className="flex justify-center">
        <Image
          src={product.images[0]!.src}
          alt={product.title}
          width={150}
          height={150}
          className="mix-blend-multiply"
        />
      </div>
      <h4 className="font-mono text-sm lowercase">{product.title}</h4>
      <div className="mt-1 flex w-full items-center justify-start space-x-2">
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
