import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { Leads } from "@/pages/Leads";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
        </Route>

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/leads" replace />} />
        <Route path="*" element={<Navigate to="/leads" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
