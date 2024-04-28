import React, { useEffect, useState } from 'react';
import SideMenu from '../../../layouts/sideMenu';
import Header from '../../../layouts/header';
import Table from '../../../globals/components/tables';
import AddModal from './components/addModal';
import { getAllTransactions, createTransactions } from '../../../globals/axios/transactions';
import queryString from 'query-string'
import Swal from "sweetalert2";

const Transactions = () => {
  const headers = [
    {
      var: 'itemsName',
      label: 'Nama Barang'
    },
    {
      var: 'stock',
      label: 'Stok'
    },
    {
      var: 'qty',
      label: 'Jumlah Terjual'
    },
    {
      var: 'transactionDate',
      label: 'Tanggal Transaksi'
    },
    {
      var: 'categoriesName',
      label: 'Jenis Barang'
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    itemsId: null,
    type: null,
    qty: null,
    transactionDate: null,
  });

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTransactions = await getAllTransactions();
        if (dataTransactions?.data?.transactions?.length > 0) {
          setData(dataTransactions?.data?.transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchData();
  }, []);


  const handleSearch = async (row) => {

    let values = {
      search : row
    };

    let query = queryString.stringify(values);
    let dataTransactions = await getAllTransactions(query);
    setData(dataTransactions?.data?.transactions)
  };

  const handleAdd = () => {
    setFormData({
      itemsId: null,
      type: null,
      qty: null,
      transactionDate: null,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setFormData({
      itemsId: null,
      type: null,
      qty: null,
      transactionDate: null,
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {

    try {
      
      await createTransactions(formData);
      Swal.fire({
        icon: "success",
        text: "Berhasil daftar transaksi",
      });
      
      
      let dataTransactions = await getAllTransactions();
      setData(dataTransactions?.data?.transactions)
      setShowModal(false);
      setFormData({
        itemsId: null,
        type: null,
        qty: null,
        transactionDate: null,
      });
    

    } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message,
        });
        console.error('Error during login:', error);
      }
  }

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <SideMenu />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h2>Transaksi</h2>
            <div className="d-flex mb-2">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleAdd}>Tambah</button>
            </div>
            <Table headers={headers} data={data} isAction={false} />
            <AddModal formData={formData} handleChange={handleChange} showModal={showModal} handleCloseModal={handleCloseModal} isUpdate={false} handleSubmit={handleSubmit}  />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
