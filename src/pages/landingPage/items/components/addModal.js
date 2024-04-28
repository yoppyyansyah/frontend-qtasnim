import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllCategories } from '../../../../globals/axios/categories';

const AddModal = ({ formData, handleChange, showModal, handleCloseModal, handleSubmit }) => {

  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCategories = await getAllCategories();
        if (dataCategories?.data?.categories?.length > 0) {
          setCategories(dataCategories?.data?.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData();
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Barang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Nama:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="categoriesId">
            <Form.Label>Jenis Barang:</Form.Label>
            <Form.Select
              name="categoriesId"
              value={formData.categoriesId}
              onChange={handleChange}
            >

              <option value="">Pilih Jenis Barang</option>
              {categories.map((dataCategory) => {
                return <option key={dataCategory.id} value={dataCategory.id}>{dataCategory.name}</option>;
              })}
              
              {/* Add more options as needed */}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Keluar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
