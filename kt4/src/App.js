import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <div className="container">
        <h1 className="header"></h1>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
