import { useState, useEffect } from "react";
import api from "../../api/api.js";
import Cookies from "js-cookie";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import styled from "styled-components";

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
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    api
      .get("/user/info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserInfo(res.data))
      .catch(() => (window.location.href = "/login"));
  }, []);

  return (
    <AdminLayout user={userInfo}>
      <Title>Thông tin Admin</Title>
      {userInfo && (
        <InfoCard>
          <p>
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Role:</strong> {userInfo.role}
          </p>
        </InfoCard>
      )}
    </AdminLayout>
  );
}

export default AdminDashBoard;
