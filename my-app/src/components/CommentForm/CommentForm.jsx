import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Modal, Form,
} from 'semantic-ui-react';
import uniqid from 'uniqid';

export const CommentForm = ({ onCreateComment, productId }) => {
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;

      setCommentText(value);
    }, [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentText) {
      const newComment = {
        id: uniqid(),
        productId,
        description: commentText,
        date: new Date(),
      };

      onCreateComment(newComment);
      setOpen(false);
      setCommentText('');
    }
  };

  const handleClose = useCallback(
    () => {
      setOpen(false);
      setCommentText('');
    },
    [],
  );

  return (
    <Modal
      onSubmit={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Add Comment</Button>}
    >
      <Header icon>
        <Icon name="server" />
        Leave your feedback
      </Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Comment"
              placeholder="Comment"
              type="text"
              value={commentText}
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

CommentForm.propTypes = {
  onCreateComment: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};
