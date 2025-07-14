import { useState, useEffect } from "react";
import api from "../../api/api.js";
import Cookies from "js-cookie";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

function AdminDashBoard() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Không tìm thấy thông tin người dùng.</p>;

  return (
    <>
      <Title>Thông tin Admin</Title>
      <InfoCard>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </InfoCard>
    </>
  );
}

export default AdminDashBoard;
