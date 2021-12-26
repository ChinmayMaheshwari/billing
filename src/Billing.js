import { InputGroup, FormControl, Form, Row, Container, Col, FloatingLabel, Stack, Table, Button } from 'react-bootstrap';
import {React, useEffect, useState} from 'react'
import {inWords, getInvoiceNumber, intialStateData, getInteger} from './Utility';
import MoreInfo from './MoreInfo';

function Billing({setShow, setModalContent}) {
    const [data, setData] = useState(intialStateData);
    const roundoff = ( x, base=10) => {
      return parseInt(Math.ceil(x / base)) * base
    }
    const onChangeHandler = (e) => {
      const element = e.target;
      let updatedData = {...data, [element.name]: element.value}
      let netWeight = parseFloat(parseFloat(updatedData.GrossWeight || 0) - parseFloat(updatedData.DeductionWeight || 0)).toFixed(2)
      let hamali = roundoff(netWeight,1)*10 + 50;
      updatedData = {...updatedData, NetWeight: netWeight, hamali: hamali}
      let batao = roundoff((netWeight * updatedData.rate)/100) + 20;
      if (getInteger(updatedData.GrossWeight) < getInteger(updatedData.DeductionWeight)){
        updatedData.NetWeight = getInteger(updatedData.NetWeight) - 1
        updatedData.NetWeight = 100 - getInteger(updatedData.DeductionWeight) + getInteger(updatedData.GrossWeight)
      }
      const expenseTotal = getInteger(batao) + getInteger(updatedData.advance) + getInteger(updatedData.kata) + getInteger(updatedData.hamali) + getInteger(updatedData.brokerage) + getInteger(updatedData.agreement) + getInteger(updatedData.cheque)
      let total = netWeight * getInteger(updatedData.rate)
      total = total - expenseTotal
      total = Math.round(total)
      updatedData = {...updatedData, total: total, totalInWords: inWords(total), batao: batao, expenseTotal: expenseTotal }
      setData(updatedData)
    }

    const submitHandler = (e) => {
      e.preventDefault();
      setShow(true);
      window.api.receive("response", (data) => {
        if(data.source=='Created'){
          setModalContent(<MoreInfo data={data.data}/>)
          setData(intialStateData);
        }
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
              <InputGroup.Text id="date">Date</InputGroup.Text>
              <FormControl
                value={data.date.toLocaleString()}
                aria-label="Date"
                aria-describedby="date"
                name="date"
                readOnly
                />
            </InputGroup>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSelect" label="Factory" className='mb-3'>
              <Form.Select aria-label="Factory Name" name="factory_name"
                onChange={onChangeHandler}>
                  {JSON.parse(localStorage.getItem("factory") || "[]").map((d, idx) =>
                    <option key={idx} value={d.factory}>{d.factory}</option>
                  )}
              </Form.Select>
            </FloatingLabel>
          </Col>          
        </Row>
        <Row className='mb-3'>
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
              <InputGroup.Text id="buyer-name">Seller</InputGroup.Text>
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
              <InputGroup.Text id="buyer-name">Location</InputGroup.Text>
              <FormControl
                value={data.buyer_name}
                onChange={onChangeHandler}
                placeholder="Location"
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
            <InputGroup className="mb-3">
              <InputGroup.Text>Rate</InputGroup.Text>
              <FormControl aria-label="Amount" value={data.rate}
                onChange={onChangeHandler} type="number" min="0" name="rate" required/>
              <InputGroup.Text>₹</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSelect" label="Category" className='mb-3'>
              <Form.Select aria-label="Floating label select example" name="category" 
                onChange={onChangeHandler}>
                <option value="Cotton">Cotton</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col xs lg="4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Weight</th>
                  <th colSpan="2">Kwintal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Gross</th>
                  <td colSpan="2">
                    <FormControl
                      value={data.GrossWeight}
                      onChange={onChangeHandler}
                      name="GrossWeight"
                      type="number"
                      min="0"
                      required
                      />
                  </td>
                </tr>
                <tr>
                  <th>Tare</th>
                  <td colSpan="2">
                    <FormControl
                      value={data.DeductionWeight}
                      onChange={onChangeHandler}
                      name="DeductionWeight"
                      type="number"
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
                        value={data.NetWeight}
                        name="NetWeight"
                        onChange={onChangeHandler}
                        readOnly
                        />
                    </InputGroup> 
                  </td>
                </tr>
              </tbody>
            </Table>
            <Stack  gap={4}>
              <InputGroup>
                <InputGroup.Text id="Advance">Net Total</InputGroup.Text>
                <FormControl
                  value={roundoff(data.rate * data.NetWeight, 1)}
                  name="netTotal"
                  onChange={onChangeHandler}
                  aria-label="Advance"
                  aria-describedby="Advance"
                  type="number"
                  min="0"
                  required
                  />
                <InputGroup.Text>₹</InputGroup.Text>
              </InputGroup>
              <InputGroup>
                  <InputGroup.Text id="expenseTotal">Expense Total</InputGroup.Text>
                  <FormControl
                    value={data.expenseTotal}
                    name="advance"
                    onChange={onChangeHandler}
                    aria-label="Advance"
                    aria-describedby="Advance"
                    type="number"
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
                </Stack>
              
          </Col>
          <Col xs lg="4">
          </Col>
          <Col xs lg="4">
            <Stack gap={2}>
            <InputGroup>
                  <InputGroup.Text id="Advance">Batao</InputGroup.Text>
                  <FormControl
                    value={data.batao}
                    name="advance"
                    onChange={onChangeHandler}
                    aria-label="Advance"
                    aria-describedby="Advance"
                    type="number"
                    min="0"
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
                    min="0"
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
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
                
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
                  <InputGroup.Text id="Kata">Brokerage</InputGroup.Text>
                  <FormControl
                    value={data.brokerage}
                    onChange={onChangeHandler}
                    name="brokerage"
                    aria-label="brokerage"
                    aria-describedby="brokerage"
                    type="number"
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
                
                <InputGroup>
                  <InputGroup.Text id="Digar">Agreement</InputGroup.Text>
                  <FormControl
                    value={data.agreement}
                    onChange={onChangeHandler}
                    name="agreement"
                    aria-label="agreement"
                    aria-describedby="agreement"
                    type="number"
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text id="cheque">Cheque</InputGroup.Text>
                  <FormControl
                    value={data.cheque}
                    onChange={onChangeHandler}
                    name="cheque"
                    aria-label="cheque"
                    aria-describedby="cheque"
                    type="number"
                    step={roundoff(getInteger(data.NetWeight * getInteger(data.rate))*0.001)}
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text id="expenseTotal">Total</InputGroup.Text>
                  <FormControl
                    value={data.expenseTotal}
                    name="advance"
                    aria-label="Advance"
                    aria-describedby="Advance"
                    type="number"
                    min="0"
                    required
                    />
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
              
            </Stack>
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
