import React, { useState, useEffect, useCallback } from 'react';
import {
  Button, Card, Image, Loader,
} from 'semantic-ui-react';
import { Route } from 'react-router-hoc';
import {
  getProductDetails, getComments, createComment, deleteComment, deleteProduct, createProduct,
} from '../../api/api';
import { CommentForm } from '../CommentForm';
import { ProductFormEdit } from '../ProductFormEdit';

const ProductDetailsRoute = Route({
  productId: Route.params.enum(),
}, ({ productId }) => `/${productId}`);

export const ProductDetails = ProductDetailsRoute(({ productId }) => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(
    () => {
      const timer1 = setTimeout(() => setShow(true), 3000);

      return () => {
        clearTimeout(timer1);
      };
    }, [],
  );

  useEffect(() => {
    getProductDetails('products', productId)
      .then(setProduct);
  }, []);

  useEffect(() => {
    getComments('comments', productId)
      .then(setComments);
  }, []);

  useEffect(() => {
    setProduct(product);
  }, [product]);

  const onCreateComment = useCallback(
    (newComment) => {
      createComment(newComment, productId);
      setComments((prevComments) => [...prevComments, newComment]);
    }, [],
  );

  const onDelete = useCallback(
    (id) => {
      deleteComment(productId, id);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    }, [comments],
  );

  const onCreate = useCallback(
    (newProduct) => {
      deleteProduct(productId);
      createProduct(newProduct);
      setProduct(newProduct);
    }, [],
  );

  return show ? (
    <Card>
      <Image src={product.imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{product.name}</Card.Header>
        <Card.Description>
          {`Count: ${product.count}, Width: ${product.size.width}, Height: ${product.size.height}, Weight: ${product.weight} `}
        </Card.Description>
        <p>
          Comments:
        </p>
        {comments.length > 0 && comments.map((comment) => (
          <Card.Description key={comment.id}>
            <p>
              {comment.description}
            </p>
            <Button size="mini" onClick={() => onDelete(comment.id)}>
              Delete
            </Button>
          </Card.Description>
        ))}
      </Card.Content>
      <CommentForm onCreateComment={onCreateComment} productId={productId} />
      <ProductFormEdit onCreate={onCreate} product={product} />
    </Card>
  ) : (
    <Loader active />
  );
});
