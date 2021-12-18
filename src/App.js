import Billing from './Billing';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { useState } from 'react';
import WaitModal from './Modal'
import { Spinner } from 'react-bootstrap';

function App() {
  const [flag, setflag] = useState(false);
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState(<Spinner animation="grow" />)
  return (
    <>
      <Navbar setflag={setflag}/>
      {flag?<Dashboard setShow={setShow} setModalContent={setModalContent} />:<Billing setShow={setShow}  setModalContent={setModalContent}/>}
      <WaitModal show={show} setShow={setShow} prop={modalContent}/>
    </>
  );
}

export default App;
