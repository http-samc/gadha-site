import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: '6e81beb9ce7b9259de88cf21a5c21f4c',
  domain: 'gadhaco.myshopify.com',
});

export default client;
