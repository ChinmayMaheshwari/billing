import React from 'react'
import { InputGroup, FormControl, Form, Row, Container, Col, FloatingLabel, Stack, Table, Button } from 'react-bootstrap';
import { inWords } from './Utility';

function MoreInfo({ data }) {
    return (
            <Container className='my-3 p-5' style={{border: 'solid', boxShadow:'3px 10px #888888'}}>
            <h1 className='mb-3 text-center'>Invoice</h1>
            <Form id='bill-form' disabled={true}>
              <Row>
                <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="invoice">Invoice No</InputGroup.Text>
                    <FormControl
                      value={data.invoice_id}
                      aria-label="invoice_no"
                      aria-describedby="invoice"
                      name="invoice_id"
                      readOnly
                      />
                  </InputGroup>
                </Col>
      
                <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="vehicle-no">Vehicle No</InputGroup.Text>
                    <FormControl
                      placeholder="Vehicle Number"
                      value={data.vehicle_number}
                      aria-label="Vehicle No"
                      aria-describedby="vehice-no"
                      name="vehicle_number"
                      readOnly
                      required
                      />
                  </InputGroup>
                </Col>
                <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="date">Date</InputGroup.Text>
                    <FormControl
                      value={new Date(data.date).toLocaleString()}
                      aria-label="Date"
                      aria-describedby="date"
                      name="date"
                      readOnly
                      />
                  </InputGroup>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="seller-name">Seller</InputGroup.Text>
                    <FormControl
                      value={data.seller_name}
                      readOnly
                      placeholder="Seller Name"
                      aria-label="Seller"
                      aria-describedby="seller-name"
                      name="seller_name"
                      required
                      />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="buyer-name">Buyer</InputGroup.Text>
                    <FormControl
                      value={data.buyer_name}
                      readOnly
                      placeholder="Buyer Name"
                      aria-label="Buyer"
                      aria-describedby="buyer-name"
                      name="buyer_name"
                      required
                      />
                  </InputGroup>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <FloatingLabel controlId="floatingSelect" label="Category" className='mb-3'>
                    <Form.Select aria-label="Floating label select example" name="category" 
                      disabled value={data.category}>
                      <option value="Cotton">Cotton</option>
                      <option value="Soyabean">Soyabean</option>
                      <option value="Chana">Chana</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Rate</InputGroup.Text>
                    <FormControl aria-label="Amount" value={data.rate}
                      readOnly type="number" min="0" name="rate" required/>
                    <InputGroup.Text>₹</InputGroup.Text>
                  </InputGroup>
                </Col>        
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Bags</InputGroup.Text>
                    <FormControl aria-label="Amount" value={data.bags}
                      readOnly type="number" min="0" name="bags" />
                  </InputGroup>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col xs lg="3">
                  <Stack gap={2}>
                    <InputGroup>
                      <InputGroup.Text id="Hamali">Hamali</InputGroup.Text>
                        <FormControl
                          value={data.hamali}
                          readOnly
                          name="hamali"
                          aria-label="Hamali"
                          aria-describedby="Hamali"
                          type="number"
                          min="0"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Majdoori">Majdoori</InputGroup.Text>
                        <FormControl
                          value={data.majdoori}
                          readOnly
                          name="majdoori"   
                          aria-label="Majdoori"
                          aria-describedby="Majdoori"
                          type="number"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Bhada">Bhada</InputGroup.Text>
                        <FormControl
                          value={data.bhada}
                          readOnly
                          name="bhada"
                          aria-label="Bhada"
                          aria-describedby="Bhada"
                          type="number"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Digar">Digar</InputGroup.Text>
                        <FormControl
                          value={data.digar}
                          readOnly
                          name="digar"
                          aria-label="Digar"
                          aria-describedby="Digar"
                          type="number"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Cash">Cash</InputGroup.Text>
                        <FormControl
                          value={data.cash}
                          readOnly
                          name="cash"
                          aria-label="Cash"
                          aria-describedby="Cash"
                          type="number"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Kata">Kata</InputGroup.Text>
                        <FormControl
                          value={data.kata}
                          readOnly
                          name="kata"
                          aria-label="Kata"
                          aria-describedby="Kata"
                          type="number"
                          required
                          />
                        <InputGroup.Text>₹</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Text id="Advance">Advance</InputGroup.Text>
                        <FormControl
                          value={data.advance}
                          name="advance"
                          readOnly
                          aria-label="Advance"
                          aria-describedby="Advance"
                          type="number"
                          required
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
                            value={parseInt(data.GrossWeight)}
                            readOnly
                            name="GrossWeightInKwintal"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            />
                        </td>
                        <td>            
                          <FormControl
                            value={parseFloat(data.GrossWeight % 1).toFixed(2)*100}
                            name="GrossWeightInKilo"
                            readOnly
                            type="number"
                            step="0.01"
                            min="0"
                            max="999"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Deduction</th>
                        <td colSpan="2">
                          <FormControl
                            value={parseInt(data.DeductionWeight)}
                            readOnly
                            name="DeductionWeightInKwintal"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            />
                        </td>
                        <td>            
                          <FormControl
                            value={parseFloat(data.DeductionWeight%1).toFixed(2)*100}
                            readOnly
                            name="DeductionWeightInKilo"
                            type="number"
                            step="0.01"
                            max="999"
                            min="0"
                            required
                            />
                        </td>
                      </tr>
                      <tr>
                        <th>Net</th>
                        <td colSpan="2">
                          <InputGroup>
                            <FormControl
                              value={parseInt(data.NetWeight)}
                              name="NetWeightInKwintal"
                              readOnly
                              readOnly
                              />
                          </InputGroup> 
                        </td>
                        <td>
                          <InputGroup>
                            <FormControl
                              value={parseFloat(data.NetWeight%1).toFixed(2)*100}
                              readOnly
                              name="NetWeightInKilo"
                              />
                          </InputGroup>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='mb-5'>
                <Col>   
                  <InputGroup>
                    <InputGroup.Text id="totalAmount">Total</InputGroup.Text>
                    <FormControl
                      value={data.total}
                      aria-label="Total"
                      aria-describedby="totalAmountLabel"
                      name="total"
                      readOnly
                      />
                    <InputGroup.Text>₹</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                <InputGroup.Text id="AmountInWords">In Words</InputGroup.Text>
                <FormControl
                      value={inWords(data.total)}
                      aria-label="In Words"
                      name="totalInWords"
                      aria-describedby="AmountInWords"
                      readOnly
                      />
                      </InputGroup>
                </Col>
              </Row>
              <Row>
                <InputGroup>
                  <InputGroup.Text>Notes</InputGroup.Text>
                  <FormControl as="textarea" aria-label="With textarea"
                      readOnly name="notes" value={data.notes} />
                </InputGroup>
              </Row>
              <Row>
                <Col className='text-center mt-3'>
                    <Button id='print-btn' onClick={() => {document.getElementById('print-btn').style.display = 'none';window.print();document.getElementById('print-btn').style.display = 'inline-block';}}>Print</Button>
                </Col>
              </Row>
            </Form>
        </Container>
    )
}

export default MoreInfo
