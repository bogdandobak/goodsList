import React, { useState, useEffect } from 'react';
import {
  Button, Card, Image, Input,
} from 'semantic-ui-react';
import { Route } from 'react-router-hoc';
import { getProductDetails, getComments } from '../../api/api';

const ProductDetailRoute = Route({
  productId: Route.params.enum(),
}, ({ productId }) => `/${productId}`);

export const ProductDetails = ProductDetailRoute(({ productId }) => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getProductDetails('products', productId)
      .then(setProduct);
  }, []);

  useEffect(() => {
    getComments('comments', productId)
      .then(setComments);
  }, []);

  return (
    <Card>
      <Image src={product.imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{product.name}</Card.Header>
        <Card.Description>
          {comments.map((comment) => (
            <p key={comment.id}>
              {comment.description}
            </p>
          ))}
        </Card.Description>
      </Card.Content>
      <Input placeholder="Add comment" />
      <Button>
        Edit
      </Button>
    </Card>
  );
});
