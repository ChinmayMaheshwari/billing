import React, { useEffect , useState} from 'react'
import {Container, Table, Form, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import MoreInfo from './MoreInfo';

function Dashboard({setShow, setModalContent}) {
  const [result, setResult] = useState([]);
  const getDateAfterSubtraction = (num) => {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()-parseInt(num));
    return tomorrow.getTime()
  }
  const [query, setQuery] = useState({ 'past': getDateAfterSubtraction(1), 'buyer': '', 'seller': ''})
  useEffect(() => {
    window.api.receive("response", (data) => {
      if(data.source=='Result')
        setResult(data.data.sort((a, b) => b.invoice_id-a.invoice_id));
    });
    window.api.send('getBillByName', query);
  }, []);
  
  const setDateForSearch = (e) => {
    setQuery({...query, past: getDateAfterSubtraction(e.target.value)})
  }

    const searchHandler = (e) => {
      e.preventDefault();
      window.api.send('getBillByName', query);
    } 

    const getTotal = () => {
      let amount = 0;
      result.forEach((res) => amount+=res.total);
      return amount
    }
    const moreInfoHandler = (data) =>{
      setModalContent(<MoreInfo data={data}/>)
      setShow(true)
    }
    return (
    <Container className="justify-content-md-center">
      <Row className="align-items-center m-5">
        <Col sm={3} className="my-1">
        <InputGroup>
            <InputGroup.Text>Past</InputGroup.Text>
          <Form.Select aria-label="Floating label select example" onChange={setDateForSearch}>
            <option value="1">1 day</option>
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="365">1 year</option>
          </Form.Select>
          </InputGroup>
        </Col>
        <Col sm={4} className="my-1">
          <Form.Label htmlFor="inlineFormInputGroupSeller" visuallyHidden>
            Buyer
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>Buyer</InputGroup.Text>
            <FormControl value={query.q} onChange={(e) => setQuery({...query, 'buyer': e.target.value})} id="inlineFormInputGroupSeller" placeholder="Buyer Name" />
          </InputGroup>
        </Col>
        <Col sm={4} className="my-1">
          <Form.Label htmlFor="inlineFormInputGroupBuyer" visuallyHidden>
            Seller
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>Seller</InputGroup.Text>
            <FormControl value={query.q} onChange={(e) => setQuery({...query, 'seller': e.target.value})} id="inlineFormInputGroupBuyer" placeholder="Seller Name" />
          </InputGroup>
        </Col>
        <Col xs="auto" className="my-1">
          <Button type="submit" onClick={searchHandler} >Search</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center m-5">
        <Col xs="auto" className="my-1">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Total</InputGroup.Text>
            <FormControl
              value={getTotal()}
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
            <th>Net Weight</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {result.map( (data) => {
            return  (<tr>
            <td>{data.invoice_id}</td>
            <td>{new Date(data.date).toLocaleString()}</td>
            <td>{data.buyer_name}</td>
            <td>{data.NetWeight}</td>
            <td>{data.rate}</td>
            <td>{data.total}</td>
            <td><Button onClick={() => moreInfoHandler(data)}>More</Button></td>
          </tr>);
          })}
        </tbody>
      </Table>
    </Container>
    
    )
}

export default Dashboard
