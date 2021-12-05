import './App.css';
import Billing from './Billing';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { useState } from 'react';

function App() {
  const [flag, setflag] = useState(false);
  return (
    <>
      <Navbar setflag={setflag}/>
      {flag?<Dashboard/>:<Billing/>}
    </>
  );
}

export default App;
