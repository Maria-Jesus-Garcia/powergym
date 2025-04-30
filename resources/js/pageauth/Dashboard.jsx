import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <h2 className="text-muted">Bienvenido al Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
