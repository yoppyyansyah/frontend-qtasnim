import React, { useEffect, useState } from 'react';
import SideMenu from '../../../layouts/sideMenu';
import Header from '../../../layouts/header';
import Table from '../../../globals/components/tables';
import AddModal from './components/addModal';
import ConfirmationDialog from '../../../globals/components/confirmationDialog'; 
import { getAllItems, createItems, updateItems, deleteItems } from '../../../globals/axios/items';
import queryString from 'query-string'
import Swal from "sweetalert2";

const Items = () => {
  const headers = [
    {
      var: 'name',
      label: 'Nama'
    },
    {
      var: 'categoriesName',
      label: 'Jenis Barang'
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [indexUpdateDelete, setIndexUpdateDelete] = useState(null)

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataItems = await getAllItems();
        if (dataItems?.data?.items?.length > 0) {
          setData(dataItems?.data?.items);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleUpdate = (row) => {
    setFormData(row);
    setIsUpdate(true);
    setIndexUpdateDelete(row.id)
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setIndexUpdateDelete(row.id)
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = async () => {

    try {
      await deleteItems(indexUpdateDelete);
        setIndexUpdateDelete(null)

        setShowConfirmation(false);
        let dataItems = await getAllItems();
        setData(dataItems?.data?.items)
        Swal.fire({
          icon: "success",
          text: "Berhasil ubah barang",
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message,
      });
      console.error('Error during login:', error);
    }
  };

  const handleCancelDelete = () => {
    setIndexUpdateDelete(null)
    setShowConfirmation(false); 
  };

  const handleSearch = async (row) => {

    let values = {
      search : row
    };

    let query = queryString.stringify(values);
    let dataItems = await getAllItems(query);
    setData(dataItems?.data?.items)
  };

  const handleAdd = () => {
    setFormData({
      name: '',
    });
    setIsUpdate(false);
    setIndexUpdateDelete(null)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setFormData({
      name: ''
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
      if(isUpdate){
        await updateItems(indexUpdateDelete, formData);
        setIndexUpdateDelete(null)
        Swal.fire({
          icon: "success",
          text: "Berhasil ubah barang",
        });
      }else{
        await createItems(formData);
        Swal.fire({
          icon: "success",
          text: "Berhasil daftar barang",
        });
      }
      
      let dataItems = await getAllItems();
      setData(dataItems?.data?.items)
      setShowModal(false);
      setFormData({
        name: '',
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
            <h2>Barang</h2>
            <div className="d-flex mb-2">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleAdd}>Tambah</button>
            </div>
            <Table headers={headers} data={data} handleUpdate={handleUpdate} handleDelete={handleDelete} isAction={true} />
            <AddModal formData={formData} handleChange={handleChange} showModal={showModal} handleCloseModal={handleCloseModal} isUpdate={isUpdate} handleSubmit={handleSubmit}  />
            <ConfirmationDialog showConfirmation={showConfirmation} handleConfirm={handleConfirmDelete} handleClose={handleCancelDelete} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Items;
