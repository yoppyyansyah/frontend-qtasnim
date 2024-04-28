import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Categories from './pages/landingPage/categories';
import Items from './pages/landingPage/items';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transactions from './pages/landingPage/transactions';
import CompareData from './pages/landingPage/compareData';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/transactions" />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/items" element={<Items />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/compare-data" element={<CompareData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
