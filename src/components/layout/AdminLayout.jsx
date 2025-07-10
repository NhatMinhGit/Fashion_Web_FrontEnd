import { useState, useEffect } from "react";
import styled from "styled-components";
import AdminSidebar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import api from "../../api/api.js";
import Cookies from "js-cookie";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  margin-left: ${(props) => (props.$collapsed ? "40px" : "240px")};
  transition: margin-left 0.3s ease;
  padding: 15px;
`;

const PageWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

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
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/login"));
  }, []);

  return (
    <Layout>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <ContentArea $collapsed={collapsed}>
        <AdminHeader user={user} />
        <PageWrapper>{children}</PageWrapper>
      </ContentArea>
    </Layout>
  );
};

export default AdminLayout;
