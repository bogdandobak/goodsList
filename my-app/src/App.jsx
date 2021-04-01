import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ProductsList } from './components/ProductsList';
import { Sorter } from './components/Sorter';
import { deleteProduct, getProducts, createProduct } from './api/api';
import { ProductForm } from './components/ProductForm';
import { ProductDetails } from './components/ProductDetails';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);

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
    (newProduct) => {
      createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }, [],
  );

  const onHandlePage = useCallback(
    (id) => {
      setProductId(id);
    }, [productId],
  );

  return (
    <div className="App">
      <h1>Products</h1>
      <Sorter />
      <ProductForm onCreate={onCreate} />
      <Switch>
        <ProductsList products={products} onDelete={onDelete} onHandlePage={onHandlePage} />
        <ProductDetails productId={productId} products={products} />
        <Redirect to={ProductsList.link({ sortedBy: '' })} />
      </Switch>
    </div>
  );
};
