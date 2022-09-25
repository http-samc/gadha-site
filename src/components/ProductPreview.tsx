import Image from 'next/image';
import React from 'react';

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
    </div>
  );
};

export default ProductPreview;
