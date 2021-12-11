import Billing from './Billing';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { useState } from 'react';
import WaitModal from './Modal'

function App() {
  const [flag, setflag] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar setflag={setflag}/>
      {flag?<Dashboard/>:<Billing setShow={setShow} />}
      <WaitModal show={show}/>
    </>
  );
}

export default App;
