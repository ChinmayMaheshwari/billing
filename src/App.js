import Billing from './Billing';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { useState } from 'react';
import WaitModal from './Modal'
import { Spinner } from 'react-bootstrap';
import AddDetail from './AddDetail';

function App() {
  const [flag, setflag] = useState('billing');
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState(<Spinner animation="grow" />)
  return (
    <>
      <Navbar setflag={setflag}/>
      {flag=='dashboard' ? <Dashboard setShow={setShow} setModalContent={setModalContent} /> : flag=='billing' ? <Billing setShow={setShow}  setModalContent={setModalContent}/>: <AddDetail/>}
      <WaitModal show={show} setShow={setShow} prop={modalContent}/>
    </>
  );
}

export default App;
