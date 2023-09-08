import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditCharacterModal = ({ show, handleClose, character, onSave }) => {
  const [editedCharacter, setEditedCharacter] = useState(character);

  const handleChange = (field, value) => {
    setEditedCharacter({
      ...editedCharacter,
      [field]: value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Character</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Char Name</label>
          <input
        type="text"
        className="form-control"
        value={editedCharacter.charName}
        onChange={(e) => handleChange('charName', e.target.value)}
      />
                <label>Class</label>
     <input
        type="text"
        className="form-control"
        value={editedCharacter.classType}
        onChange={(e) => handleChange('classType', e.target.value)}
      />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSave(editedCharacter)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCharacterModal;

