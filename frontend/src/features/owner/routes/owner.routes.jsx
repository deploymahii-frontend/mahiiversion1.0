import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OwnerLayout from '../layouts/OwnerLayout';

const OwnerRoutes = () => {
  return (
    <Routes>
      <Route element={<OwnerLayout />}>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/customers" element={<div>Customers</div>} />
        <Route path="/marketing" element={<div>Marketing</div>} />
        <Route path="/analytics" element={<div>Analytics</div>} />
        <Route path="/staff" element={<div>Staff</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  );
};

export default OwnerRoutes;
