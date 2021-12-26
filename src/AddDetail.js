import React from 'react'
import { useState, useEffect } from 'react';
import {InputGroup, FormControl, Container, Row, Col, Button, Table} from 'react-bootstrap';

function AddDetail() {
    const [data, setData] = useState({ 'factory': '', 'percentage': '' });
    const [list, setList] = useState(JSON.parse(localStorage.getItem("factory") || "[]"));
    const onAddHandler = () => {
        if (!data.factory)
            return 
        list.push(data)
        localStorage.setItem('factory', JSON.stringify(list));
        setList(list)
        setData({ 'factory': '', 'percentage': '' })
    }
    const removeHandler = (idx) => {
        list.splice(idx, 1)
        localStorage.setItem('factory', JSON.stringify(list));
        setList(list);
        setData({ 'factory': '', 'percentage': '' })
    }
    return (
        <Container>
            <Row  className="m-5">
                <Col xs lg="6">
                    <InputGroup>
                        <InputGroup.Text id="factory-name">Factory Name</InputGroup.Text>
                        <FormControl
                            value={data.factory}
                            onChange={(e) => setData({...data, factory: e.target.value})}
                            placeholder="Factory Name"
                            aria-label="factory"
                            aria-describedby="factory-name"
                            name="factory_name"
                            required
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <InputGroup.Text id="buyer-name">Percentage</InputGroup.Text>
                        <FormControl
                        value={data.percentage}
                        onChange={(e) => setData({...data, percentage: e.target.value})}
                        placeholder="Percentage"
                        aria-label="Percentage"
                        aria-describedby="percentage"
                        name="percentage"
                        required
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <Button onClick={onAddHandler}>
                        Add
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover variant="light">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Factory Name</th>
                    <th>Percentage</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>      
                {list.map( (d, idx) =>
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{d.factory}</td>
                        <td>{d.percentage}</td>
                        <td><Button onClick = {() => removeHandler(idx)}> Remove </Button></td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    )
}

export default AddDetail
