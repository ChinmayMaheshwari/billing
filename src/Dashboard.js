import React from 'react'
import {Container, FloatingLabel, Dropdown, Table, Form, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'

function Dashboard() {
    return (
<Container className="justify-content-md-center">
      <Row className="align-items-center m-5">
        <Col sm={4} className="my-1">
        <InputGroup>
            <InputGroup.Text>Past</InputGroup.Text>
          <Form.Select aria-label="Floating label select example">
            <option>1 day</option>
            <option value="1">7 days</option>
            <option value="2">30 days</option>
            <option value="3">1 year</option>
          </Form.Select>
          </InputGroup>
        </Col>
        <Col sm={4} className="my-1">
          <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
            Seller
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>Query</InputGroup.Text>
            <FormControl id="inlineFormInputGroupUsername" placeholder="Seller Name" />
          </InputGroup>
        </Col>
        <Col xs="auto" className="my-1">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center m-5">
        <Col xs="auto" className="my-1">
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
      </Row>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Buyer Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-04-2021</td>
            <td>Raj Mill</td>
            <td>30000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>12-04-2021</td>
            <td>Indian Nill</td>
            <td>30000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>12-04-2021</td>
            <td>Famous Mill</td>
            <td>40000</td>
          </tr>
        </tbody>
      </Table>
    </Container>
    
    )
}

export default Dashboard
