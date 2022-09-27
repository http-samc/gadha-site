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
        'relative h-[600px] w-screen overflow-y-auto rounded-xl border-amber-50/30 bg-amber-50/10 p-8 transition-all lg:w-[700px] lg:border lg:backdrop-blur-sm lg:hover:backdrop-blur-md',
        {
          'flex h-[316px] items-center justify-center': loading,
          'grid grid-cols-1 place-items-center gap-4 overflow-y-auto scrollbar scrollbar-thumb-amber-50 md:grid-cols-2 lg:grid-cols-3':
            !loading,
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
