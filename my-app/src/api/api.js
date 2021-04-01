/* eslint-disable no-console */
const BASE_URL = 'https://60645e8ff0919700177857e1.mockapi.io/';

// eslint-disable-next-line consistent-return
const request = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`);

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

export const createProduct = async (newProduct) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newProduct),
  });

  const result = await response.json();

  return result;
};

export const getProductDetails = async (url, id) => {
  const response = await fetch(`${BASE_URL}${url}/${id}`);

  const result = await response.json();

  return result;
};

export const getComments = async (url, id) => {
  const response = await fetch(`${BASE_URL}products/${id}/${url}`);

  const result = await response.json();

  return result;
};

export const getProducts = () => request('products');
