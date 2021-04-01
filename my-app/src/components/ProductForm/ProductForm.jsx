import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Modal, Form,
} from 'semantic-ui-react';
import uniqid from 'uniqid';

export const ProductForm = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

  const handleChange = useCallback(
    (event) => {
      const { value, name } = event.target;

      setInputQuery((prevQuery) => ({
        ...prevQuery,
        [name]: value,
      }));
    }, [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      imageUrl,
      name,
      count,
      weight,
      height,
      width,
    } = inputQuery;

    if (imageUrl && name && count && weight && height && width) {
      const newProduct = {
        id: uniqid(),
        comments: [],
        imageUrl,
        name,
        count,
        size: {
          height,
          width,
        },
        weight,
      };

      onCreate(newProduct);
      setOpen(false);
      setInputQuery({
        imageUrl: '',
        name: '',
        count: '',
        width: '',
        height: '',
        weight: '',
      });
    }
  };

  const handleClose = useCallback(
    () => {
      setOpen(false);
      setInputQuery({
        imageUrl: '',
        name: '',
        count: '',
        width: '',
        height: '',
        weight: '',
      });
    },
    [],
  );

  return (
    <Modal
      onSubmit={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>New Product</Button>}
    >
      <Header icon>
        <Icon name="server" />
        Create Product
      </Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Image url"
              placeholder="Image url"
              type="url"
              name="imageUrl"
              value={inputQuery.imageUrl}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Product name"
              placeholder="Product name"
              type="text"
              name="name"
              value={inputQuery.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Count"
              placeholder="Count"
              type="number"
              name="count"
              value={inputQuery.count}
              onChange={handleChange}
              required
            />

            <Form.Input
              label="Width"
              placeholder="Width"
              type="number"
              name="width"
              value={inputQuery.width}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Height"
              placeholder="Height"
              type="number"
              name="height"
              value={inputQuery.height}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Weight"
              placeholder="Weight"
              type="text"
              name="weight"
              value={inputQuery.weight}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button>Save</Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ProductForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
