import {React} from 'react';
import { Modal, Spinner} from 'react-bootstrap';

function WaitModal({show}) {
    return (
      <>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Saving Data Please Wait ...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'><Spinner animation="grow" /></Modal.Body>
        </Modal>
      </>
    );
}

export default WaitModal
