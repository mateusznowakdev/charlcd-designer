import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

export function ShareModal({ content, setShareURL, shareURL }) {
  return (
    <Modal backdrop={false} show={!!shareURL}>
      <ModalBody>
        <p>Copy this URL or drag it to the bookmark bar:</p>
        <p className="share-url">
          <a href={shareURL}>{content} &mdash; Character LCD Designer</a>
        </p>
        <p>
          This URL contains the information you've entered so far.
          <br />
          No user data is stored on the server.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={setShareURL} variant="light">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
