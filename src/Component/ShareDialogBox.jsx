
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaCopy } from 'react-icons/fa';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupText,
  Input
} from 'reactstrap';

const ShareDialogBox = ({ isOpen, toggle }) => {

  const [copySuccess, setCopySuccess] = useState('');

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered style={{zIndex:'1050'}}>
      <ModalHeader toggle={toggle}>Share This Page</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-around mb-3">
          <FaFacebook size={32} style={{ cursor: 'pointer' }} title="Share on Facebook" />
          <FaTwitter size={32} style={{ cursor: 'pointer' }} title="Share on Twitter" />
          <FaLinkedin size={32} style={{ cursor: 'pointer' }} title="Share on LinkedIn" />
        </div>
        <InputGroup>
          <InputGroupText>Link</InputGroupText>
          <Input type="text" value={currentUrl} readOnly />
          <Button color="primary" onClick={handleCopyLink}>
            <FaCopy />
          </Button>
        </InputGroup>
        {copySuccess && <p className="text-success mt-2">{copySuccess}</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShareDialogBox;
