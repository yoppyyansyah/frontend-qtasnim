import React, { useEffect, useState } from 'react';
import SideMenu from '../../../layouts/sideMenu';
import Header from '../../../layouts/header';
import Table from '../../../globals/components/tables';
import AddModal from './components/addModal';
import ConfirmationDialog from '../../../globals/components/confirmationDialog'; 
import { getAllCategories, createCategories, updateCategories, deleteCategories } from '../../../globals/axios/categories';
import queryString from 'query-string'
import Swal from "sweetalert2";

const Categories = () => {

  const headers = [
    {
      var: 'name',
      label: 'Nama'
    },
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
        const dataCategories = await getAllCategories();
        if (dataCategories?.data?.categories?.length > 0) {
          setData(dataCategories?.data?.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
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
      await deleteCategories(indexUpdateDelete);
        setIndexUpdateDelete(null)

        setShowConfirmation(false);
        let dataCategories = await getAllCategories();
        setData(dataCategories?.data?.categories)
        Swal.fire({
          icon: "success",
          text: "Berhasil ubah Jenis Barang",
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
    let dataCategories = await getAllCategories(query);
    setData(dataCategories?.data?.categories)
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
        await updateCategories(indexUpdateDelete, formData);
        setIndexUpdateDelete(null)
        Swal.fire({
          icon: "success",
          text: "Berhasil ubah Jenis Barang",
        });
      }else{
        await createCategories(formData);
        Swal.fire({
          icon: "success",
          text: "Berhasil daftar Jenis Barang",
        });
      }
      
      let dataCategories = await getAllCategories();
      setData(dataCategories?.data?.categories)
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
            <h2>Jenis Barang</h2>
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

export default Categories;
