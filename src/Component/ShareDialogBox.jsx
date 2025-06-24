

import React, { useState } from "react";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaCopy } from "react-icons/fa";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

const ShareDialogBox = ({ isOpen, toggle }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const currentUrl = encodeURIComponent(window.location.href);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(decodeURIComponent(currentUrl));
    setCopySuccess("Link copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered style={{ zIndex: "1050" }}>
      <ModalHeader toggle={toggle}>Share This Page</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-around mb-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            <FaFacebook
              size={32}
              style={{ cursor: "pointer", color: "#3b5998" }}
            />
          </a>

           <a
            href={`https://api.whatsapp.com/send?text=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <FaWhatsapp
              size={32}
              style={{ cursor: "pointer", color: "#25D366" }}
            />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
          >
            <FaLinkedin
              size={32}
              style={{ cursor: "pointer", color: "#0e76a8" }}
            />
          </a>
        </div>

        <InputGroup>
          <InputGroupText>Link</InputGroupText>
          <Input type="text" value={decodeURIComponent(currentUrl)} readOnly />
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
