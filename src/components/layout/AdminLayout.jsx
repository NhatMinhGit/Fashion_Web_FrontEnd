import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AdminSidebar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import { useUser } from "../../context/UserContext";

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
`;

const PageWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #6b7280;
`;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  return (
    <Layout>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <ContentArea $collapsed={collapsed}>
        <AdminHeader user={user} />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </ContentArea>
    </Layout>
  );
};

export default AdminLayout;
