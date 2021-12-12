import { InputGroup, FormControl, Form, Row, Container, Col, FloatingLabel, Stack, Table, Button } from 'react-bootstrap';
import {React, useEffect, useState} from 'react'
import {inWords, getInvoiceNumber, intialStateData, getInteger} from './Utility';

function Billing({setShow}) {
    const [data, setData] = useState(intialStateData);
    
    const onChangeHandler = (e) => {
      const element = e.target;
      let updatedData = {...data, [element.name]: element.value}
      let netWeightInKwintal = getInteger(updatedData.GrossWeightInKwintal) - getInteger(updatedData.DeductionWeightInKwintal)
      let netWeightInKilo = getInteger(updatedData.GrossWeightInKilo) - getInteger(updatedData.DeductionWeightInKilo)
      updatedData = {...updatedData, NetWeightInKwintal: netWeightInKwintal, NetWeightInKilo: netWeightInKilo }
      if (getInteger(updatedData.GrossWeightInKilo) < getInteger(updatedData.DeductionWeightInKilo)){
        updatedData.NetWeightInKwintal = getInteger(updatedData.NetWeightInKwintal) - 1
        updatedData.NetWeightInKilo = 1000 - getInteger(updatedData.DeductionWeightInKilo) + getInteger(updatedData.GrossWeightInKilo)
      }
      let netWeight = netWeightInKwintal + netWeightInKilo/1000
      let total = netWeight * getInteger(updatedData.rate)
      total = total - getInteger(updatedData.kata) - getInteger(updatedData.hamali) - getInteger(updatedData.cash) - getInteger(updatedData.advance) - getInteger(updatedData.digar) - getInteger(updatedData.majdoori) - getInteger(updatedData.bhada)
      total = Math.round(total)
      updatedData = {...updatedData, total: total, totalInWords: inWords(total)}
      setData(updatedData)
    }

    const submitHandler = (e) => {
      e.preventDefault();
      setShow(true);
      window.api.receive("response", (data) => {
        console.log(`Received ${data.success} from main process`);
        setShow(false)
      });
      window.api.send('createBill', data);
      
    }
    
    useEffect(() => {
      setData(d => {return {...d, 'invoice_id' : getInvoiceNumber()}});
    }, [])

    return ( 
      <Container className='my-3 p-5' style={{border: 'solid', boxShadow:'3px 10px #888888'}}>
      <h1 className='mb-3 text-center'>Invoice</h1>
      <Form id='bill-form' onSubmit={submitHandler}>
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
                onChange={onChangeHandler}
                value={data.vehicle_number}
                aria-label="Vehicle No"
                aria-describedby="vehice-no"
                name="vehicle_number"
                required
                />
            </InputGroup>
          </Col>
          <Col>
          <InputGroup className="mb-3">
              <InputGroup.Text id="date">Date</InputGroup.Text>
              <FormControl
                value={data.date}
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
                onChange={onChangeHandler}
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
                onChange={onChangeHandler}
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
                onChange={onChangeHandler}>
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
                onChange={onChangeHandler} type="number" min="0" name="rate" required/>
              <InputGroup.Text>₹</InputGroup.Text>
            </InputGroup>
          </Col>        
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>Bags</InputGroup.Text>
              <FormControl aria-label="Amount" value={data.bags}
                onChange={onChangeHandler} type="number" min="0" name="bags" />
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                    onChange={onChangeHandler}
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
                      value={data.GrossWeightInKwintal}
                      onChange={onChangeHandler}
                      name="GrossWeightInKwintal"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      />
                  </td>
                  <td>            
                    <FormControl
                    value={data.GrossWeightInKilo}
                    name="GrossWeightInKilo"
                    onChange={onChangeHandler}
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
                      value={data.DeductionWeightInKwintal}
                      onChange={onChangeHandler}
                      name="DeductionWeightInKwintal"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      />
                  </td>
                  <td>            
                    <FormControl
                      value={data.DeductionWeightInKilo}
                      onChange={onChangeHandler}
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
                        value={data.NetWeightInKwintal}
                        name="NetWeightInKwintal"
                        onChange={onChangeHandler}
                        readOnly
                        />
                    </InputGroup> 
                  </td>
                  <td>
                    <InputGroup>
                      <FormControl
                        value={data.NetWeightInKilo}
                        onChange={onChangeHandler}
                        name="NetWeightInKilo"
                        readOnly
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
                value={data.totalInWords}
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
                onChange={onChangeHandler} name="notes" value={data.notes} />
          </InputGroup>
        </Row>
        <Row>
          <Col className='text-center mt-3'>
              <Button id='submit-btn' type='submit'>Submit</Button>
          </Col>
        </Row>
      </Form>
  </Container>
    )
}

export default Billing
