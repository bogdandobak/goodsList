/* eslint-disable no-console */
import uniqid from 'uniqid';

const BASE_URL = 'https://60645e8ff0919700177857e1.mockapi.io/';

// eslint-disable-next-line consistent-return
const request = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`);
  console.log(response);
  const result = await response.json();

  return result;
};

export const deleteProduct = async (id) => {
  const response = await fetch(
    `${BASE_URL}/products/${id}`,
    { method: 'DELETE' },
  );

  return response;
};

export const createProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id: uniqid(),
      imageUrl: product.imageUrl,
      name: product.name,
      size: product.size,
      weight: product.weight,
      comments: [],
    }),
  });

  const result = await response.json();

  return result;
};

export const getProducts = () => request('products');
export const getComments = () => request('comments');
