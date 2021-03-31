import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Modal, Form,
} from 'semantic-ui-react';

export const ProductForm = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState({
    imageUrl: '',
    name: '',
    count: 0,
    width: 0,
    height: 0,
    weight: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setInputQuery({
      [name]: value,
    });
  };

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
    console.log(inputQuery);

    onCreate(imageUrl, name, count, weight, height, width);
    setOpen(false);
    setInputQuery({});
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
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
          <Form.Input
            label="Image url"
            placeholder="Image url"
            name="imageUrl"
            value={inputQuery.imageUrl}
            onChange={handleChange}
          />
          <Form.Input
            label="Product name"
            placeholder="Product name"
            name="name"
            value={inputQuery.name}
            onChange={handleChange}
          />
          <Form.Input
            label="Count"
            placeholder="Count"
            name="count"
            value={inputQuery.count}
            onChange={handleChange}
          />

          <Form.Input
            label="Width"
            placeholder="Width"
            name="width"
            value={inputQuery.width}
            onChange={handleChange}
          />
          <Form.Input
            label="Height"
            placeholder="Height"
            name="height"
            value={inputQuery.height}
            onChange={handleChange}
          />
          <Form.Input
            label="Weight"
            placeholder="Weight"
            name="weight"
            value={inputQuery.weight}
            onChange={handleChange}
          />
          <Button>Save</Button>
          <Button onClick={() => setOpen(false)}>
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
