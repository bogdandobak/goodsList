/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Route } from 'react-router-hoc';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../ModalWindow';

const ProductListRoute = Route({
  sortedBy: Route.params.enum('none', 'name', 'count'),
}, ({ sortedBy }) => `/${sortedBy}`);

export const ProductsList = ProductListRoute(({
  match: { params: { sortedBy } },
  products,
  onDelete,
}) => (
  <div>
    <List animated verticalAlign="middle">
      {products && products.sort((current, next) => {
        switch (sortedBy) {
          case 'name':
            return current.name.localeCompare(next.name);

          case 'count':
            return current.count - next.count;

          default:
            break;
        }
      }).map((product) => (
        <>
          <List.Item key={product.id}>
            <Image avatar src={product.imageUrl} />
            <List.Content>
              <List.Header>{product.name}</List.Header>
              <List.Description>
                {`Count: ${product.count}, weight: ${product.weight}`}
              </List.Description>
              <Link to="/productInfo">
                Product Description
              </Link>
              <ModalWindow id={product.id} onDelete={onDelete} />
            </List.Content>

          </List.Item>
        </>
      ))}
    </List>
  </div>
));
