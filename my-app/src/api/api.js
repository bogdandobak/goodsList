/* eslint-disable no-console */
const BASE_URL = 'https://60645e8ff0919700177857e1.mockapi.io/';

// eslint-disable-next-line consistent-return
const request = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      console.log(response.statusText);
    }
    const result = await response.json();

    return result;
  } catch {
    throw new Error();
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${id}`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    return response;
  } catch {
    throw new Error();
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      console.log(response.statusText);
    }
    const result = await response.json();

    return result;
  } catch {
    throw new Error();
  }
};

export const getProductDetails = async (url, id) => {
  try {
    const response = await fetch(`${BASE_URL}${url}/${id}`);

    if (!response.ok) {
      console.log(response.statusText);
    }
    const result = await response.json();

    return result;
  } catch {
    throw new Error();
  }
};

export const getComments = async (url, id) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}/${url}`);

    if (!response.ok) {
      console.log(response.statusText);
    }

    const result = await response.json();

    return result;
  } catch {
    throw new Error();
  }
};

export const createComment = async (newComment, id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      console.log(response.statusText);
    }

    const result = await response.json();

    return result;
  } catch {
    throw new Error();
  }
};

export const deleteComment = async (productId, commentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${productId}/comments/${commentId}`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    return response;
  } catch {
    throw new Error();
  }
};

export const getProducts = () => request('products');
