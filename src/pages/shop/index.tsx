import clsx from 'clsx';
import React, { useEffect } from 'react';

import ProductPreview from '@/components/ProductPreview';
import shopify from '@/utils/shopify';

const Shop = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<ShopifyBuy.Product[]>([]);
  // const [page, setPage] = React.useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    const freshProducts = await shopify.product.fetchAll();
    setProducts(freshProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={clsx(
        'w-screen rounded-xl border border-amber-50/30 p-8 backdrop-blur-sm transition-all lg:h-[600px] lg:w-[700px] lg:hover:backdrop-blur-md',
        {
          'flex h-[316px] items-center justify-center': loading,
        }
      )}
    >
      {loading ? (
        <span className="h-8 w-8 animate-ping rounded-full bg-amber-200" />
      ) : (
        products.map((product) => {
          return <ProductPreview key={product.id} {...product} />;
        })
      )}
    </div>
  );
};

export default Shop;
