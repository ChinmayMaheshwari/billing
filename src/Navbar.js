import React from 'react'
import {Nav} from 'react-bootstrap'

function Navbar({setflag}) {
    return (
    <Nav variant="tabs" defaultActiveKey="/home" className='justify-content-md-center' style={{background:'aliceblue', height: '40px'}}>
        <Nav.Item>
            <Nav.Link onClick={() => setflag(false)}>Billing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={() => setflag(true)}>Records</Nav.Link>
        </Nav.Item>
    </Nav>
    )
}

export default Navbar
