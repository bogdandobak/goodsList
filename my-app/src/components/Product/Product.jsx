import React from 'react';
import PropTypes from 'prop-types';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => (
  <List.Item>
    <Image avatar src={product.imageUrl} />
    <List.Content>
      <List.Header>{product.name}</List.Header>
      <List.Description>
        {`Count: ${product.count}, weight: ${product.weight}`}
      </List.Description>
      <Link to="/product">
        Product Description
      </Link>
    </List.Content>
  </List.Item>
);

Product.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    weight: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

Product.defaultProps = {
  product: null,
};
