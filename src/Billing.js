import { InputGroup, FormControl, Form, Row, Container, Col, FloatingLabel, Stack, Table } from 'react-bootstrap';
import React from 'react'

function Billing() {
    return ( 
    <Container className='my-5 p-5' style={{border: 'solid', boxShadow:'5px 10px #888888'}}>
    <h1 className='mb-5 text-center'>Invoice</h1>
    <Row>
      <Col>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Invoice No</InputGroup.Text>
          <FormControl
            value="101"
            aria-label="Username"
            aria-describedby="basic-addon1"
            readOnly
            />
        </InputGroup>
      </Col>

      <Col>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Vehicle No</InputGroup.Text>
          <FormControl
            placeholder="Vehicle Number"
            aria-label="Username"
            aria-describedby="basic-addon1"
            
            />
        </InputGroup>
      </Col>
      <Col>
      <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
          <FormControl
            value="02-12-2021 Thursday"
            aria-label="Username"
            aria-describedby="basic-addon1"
            readOnly
            />
        </InputGroup>
      </Col>
    </Row>
    <Row className='mb-3'>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Seller</InputGroup.Text>
          <FormControl
            placeholder="Seller Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Buyer</InputGroup.Text>
          <FormControl
            placeholder="Buyer Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
        </InputGroup>
      </Col>
    </Row>
    <Row className='mb-5'>
      <Col>
        <FloatingLabel controlId="floatingSelect" label="Category" className='mb-3'>
          <Form.Select aria-label="Floating label select example">
            <option>Cotton</option>
            <option value="1">Cotton</option>
            <option value="2">Soyabean</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text>Rate</InputGroup.Text>
          <FormControl aria-label="Amount (to the nearest dollar)" />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
      </Col>        
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text>Bags</InputGroup.Text>
          <FormControl aria-label="Amount (to the nearest dollar)" />
        </InputGroup>
      </Col>
    </Row>
<Row className='mb-5'>
  <Col xs lg="3">
    <Stack gap={2}>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Hamaili</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Majdoori</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Bhada</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Digar</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Cash</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Kata</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Advance</InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          <InputGroup.Text>₹</InputGroup.Text>
        </InputGroup>
    </Stack>
  </Col>
  <Col>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Weight</th>
          <th colSpan="2">Kwintal</th>
          <th>Kilo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Gross</th>
          <td colSpan="2">
          <FormControl
            placeholder="00"
            aria-label="Username"
            aria-describedby="basic-addon1"
            />
          </td>
          <td>            <FormControl
            placeholder="00"
            aria-label="Username"
            aria-describedby="basic-addon1"
            /></td>
         </tr>
        <tr>
          <th>Weight</th>
          <td colSpan="2">
          <FormControl
            placeholder="00"
            aria-label="00"
            aria-describedby="basic-addon1"
            />
          </td>
          <td>            <FormControl
            placeholder="00"
            aria-label="Username"
            aria-describedby="basic-addon1"
            /></td>
        </tr>
        <tr>
          <th>Net</th>
          <td colSpan="2"><InputGroup>
          <FormControl
            value="102"
            aria-label="Username"
            aria-describedby="basic-addon1"
            readOnly
            />
        </InputGroup> </td>
          <td><InputGroup>
          <FormControl
            value="20"
            aria-label="Username"
            aria-describedby="basic-addon1"
            readOnly
            />
        </InputGroup> </td>
        </tr>
      </tbody>
    </Table>
  </Col>
</Row>
<Row className='mb-5'>
  <Col>   
    <InputGroup>
      <InputGroup.Text id="basic-addon1">Total</InputGroup.Text>
      <FormControl
        value="100000"
        aria-label="Username"
        aria-describedby="basic-addon1"
        readonly
        />
      <InputGroup.Text>₹</InputGroup.Text>
    </InputGroup>
  </Col>
  <Col>
    <InputGroup>
  <InputGroup.Text id="basic-addon1">In Words</InputGroup.Text>
  <FormControl
        value="One Lakh Only"
        aria-label="Username"
        aria-describedby="basic-addon1"
        readonly
        />
        </InputGroup>
  </Col>
</Row>
<Row>
  <InputGroup>
    <InputGroup.Text>Notes</InputGroup.Text>
    <FormControl as="textarea" aria-label="With textarea" />
  </InputGroup>
</Row>
</Container>
    )
}

export default Billing
