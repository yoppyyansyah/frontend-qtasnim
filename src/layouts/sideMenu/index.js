import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              Master Jenis Barang
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/items">
              Master Barang
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">
              Transaksi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/compare-data">
              Perbandingan Jenis Barang
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;
