import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import shopify from '@/utils/shopify';

const Product = () => {
  const router = useRouter();
  const { product: pidNum } = router.query;
  const pid = btoa(`gid://shopify/Product/${pidNum}`);
  const [product, setProduct] = React.useState<ShopifyBuy.Product | null>(null);

  const fetchProductDetails = async () => {
    const productDetails = await shopify.product.fetch(pid as string);
    setProduct(productDetails);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return <div>{product?.id}</div>;
};

export default Product;
