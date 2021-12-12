import {React} from 'react';
import { Modal} from 'react-bootstrap';

function WaitModal({show, setShow, prop}) {
    return (
      <>
        <Modal fullscreen={true} show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>{prop}</Modal.Body>
        </Modal>
      </>
    );
}

export default WaitModal
