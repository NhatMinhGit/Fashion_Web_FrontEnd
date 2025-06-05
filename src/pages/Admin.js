import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/data",
          {
            withCredentials: true,
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  const { user, totalOrder, totalUser, revenuetotal, userList } = data;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <p className="lead mb-4">Welcome, {user?.username || "Admin"}!</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{totalOrder}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">{totalUser}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text fs-4">{revenuetotal} VND</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="h4 mb-3">User List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() =>
          axios
            .post(
              "http://localhost:8080/api/logout",
              {},
              { withCredentials: true }
            )
            .then(() => navigate("/login?logout=true"))
        }
        className="btn btn-danger mt-3"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Admin;
