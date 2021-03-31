import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ProductsList } from './components/ProductsList';
import { Sorter } from './components/Sorter';
import { deleteProduct, getProducts, createProduct } from './api/api';
import { ProductForm } from './components/ProductForm';

export const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  const onDelete = useCallback(
    (id) => {
      deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    }, [products],
  );

  const onCreate = useCallback(
    async (product) => {
      await createProduct({ ...product });
    }, [],
  );

  return (
    <div className="App">
      <h1>Products</h1>
      <Sorter />
      <ProductForm onCreate={onCreate} />
      <Switch>
        <ProductsList products={products} onDelete={onDelete} />
        <Redirect to={ProductsList.link({ sortedBy: 'none' })} />
      </Switch>
    </div>
  );
};
