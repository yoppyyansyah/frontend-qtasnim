import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllItems } from '../../../../globals/axios/items'

const AddModal = ({ formData, handleChange, showModal, handleCloseModal, handleSubmit }) => {

  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataItems = await getAllItems();
        if (dataItems?.data?.items?.length > 0) {
          setItems(dataItems?.data?.items);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
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
          <Form.Group controlId="itemsId">
            <Form.Label>Nama Barang:</Form.Label>
            <Form.Select
              name="itemsId"
              value={formData.itemsId}
              onChange={handleChange}
            >
              <option value="">Pilih Nama Barang</option>
              {items.map((dataItem) => {
                return <option key={dataItem.id} value={dataItem.id}>{dataItem.name}</option>;
              })} 
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Nama Barang:</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Pilih Tipe</option>
              <option key={"in"} value={"in"}>{"Masuk"}</option>
              <option key={"out"} value={"out"}>{"Keluar"}</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="qty">
            <Form.Label>Jumlah:</Form.Label>
            <Form.Control
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="transactionDate">
            <Form.Label>Tanggal Transaksi:</Form.Label>
            <Form.Control
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
            />
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
