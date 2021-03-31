import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';
import './ModalWindow.scss';

export const ModalWindow = ({ onDelete, id }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setOpen(false);
  };
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Delete</Button>}
    >
      <Header icon>
        <Icon name="archive" />
        Delete product
      </Header>
      <Modal.Content>
        <p className="text">
          Are you sure you want to delete this product?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" />
          {' '}
          No
        </Button>
        <Button color="green" inverted onClick={handleDelete}>
          <Icon name="checkmark" />
          {' '}
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ModalWindow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
