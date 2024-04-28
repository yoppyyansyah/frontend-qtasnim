import React, { useEffect, useState } from 'react';
import SideMenu from '../../../layouts/sideMenu';
import Header from '../../../layouts/header';
import { getAllCategories } from '../../../globals/axios/categories';

import { getCompareData } from '../../../globals/axios/transactions';
import queryString from 'query-string'
import {Row, Col, Form, Button, Card} from "react-bootstrap"

const CompareData = () => {

  const [categories, setCategories ] = useState([])

  const [data, setData] = useState([])

  const [formData, setFormData] = useState({
    categoriesOne: null,
    categoriesTwo: null,
    startDate: null,
    endDate: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCategories = await getAllCategories();
        if (dataCategories?.data?.categories?.length > 0) {
          setCategories(dataCategories?.data?.categories);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleGenerate = async () => {
    let query = queryString.stringify(formData);
    const compareData = await getCompareData(query);
    if (compareData?.data?.transactions?.length > 0) {
      setData(compareData?.data?.transactions);
    }
  }

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <SideMenu />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h2>Perbandingan Jenis Barang</h2>
            <Row className='mb-5'>
              <Col>
                <Form.Group controlId="categoriesOne">
                  <Form.Label>Jenis Barang 1:</Form.Label>
                  <Form.Select
                    name="categoriesOne"
                    value={formData.categoriesOne}
                    onChange={handleSearch}
                  >

                    <option value="">Pilih Jenis Barang</option>
                    {categories.map((dataCategory) => {
                      return <option key={dataCategory.id} value={dataCategory.id}>{dataCategory.name}</option>;
                    })}
                    
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="categoriesTwo">
                  <Form.Label>Jenis Barang 2:</Form.Label>
                  <Form.Select
                    name="categoriesTwo"
                    value={formData.categoriesTwo}
                    onChange={handleSearch}
                  >
                    <option value="">Pilih Jenis Barang</option>
                    {categories.map((dataCategory) => {
                      return <option key={dataCategory.id} value={dataCategory.id}>{dataCategory.name}</option>;
                    })}
                    
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="startDate">
                  <Form.Label>Tanggal Mulai:</Form.Label>
                  <Form.Control
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleSearch}
                    type="date"
                  >
                  </Form.Control>
                </Form.Group>
              </Col> 
              <Col>
                <Form.Group controlId="endDate">
                  <Form.Label>Tanggal Akhir:</Form.Label>
                  <Form.Control
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleSearch}
                    type="date"
                  >
                  </Form.Control>
                </Form.Group>
              </Col> 
              <Col className="d-flex align-items-end">  
              <Form.Group className="d-flex justify-content-center ">
                  <Button  
                    onClick={handleGenerate}
                    //disabled={disabled}
                    >Generate
                  </Button>
              </Form.Group>
              </Col>
            </Row>
            <Row>
              {data.map((dataItem)=> {
                return(
                  <Col>
                    <Card>

                        <Card.Header>
                          <strong>{dataItem.categoriesName}</strong>
                        </Card.Header>
                        <Card.Body>
                          <p class="card-text">Penjualan Terbanyak : {dataItem.maxQty}</p>
                          <p class="card-text">Penjualan Terendah : {dataItem.minQty}</p>
                        </Card.Body>
                    </Card>
                  </Col>
                )
              })}
              
            </Row>
          </main>
        </div>
      </div> 
    </div>
  );
};

export default CompareData;
