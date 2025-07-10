import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../../components/layout/AdminLayout";
import DataTable from "../../../components/ui/DataTable";
import {
  Title,
  SearchBar,
  Input,
  Button,
  AddButton,
  ActionButton,
} from "../../../components/ui/SharedStyles";

const AccountManagement = ({ user }) => {
  const [customers] = useState([
    {
      id: 1,
      name: "Nguyễn Trần Nhật Minh",
      email: "nhatminh9103@gmail.com",
      role: "USER",
    },
    {
      id: 2,
      name: "Nguyễn Trần Nhật Minh",
      email: "nhatminh9100@gmail.com",
      role: "ADMIN",
    },
    {
      id: 3,
      name: "Tun tun tun sahu",
      email: "nhatminh91003987@gmail.com",
      role: "USER",
    },
    {
      id: 4,
      name: "thanggg",
      email: "nguyenduthang985@gmail.com",
      role: "USER",
    },
    {
      id: 5,
      name: "Thang",
      email: "nguyen@gmail.com",
      role: "ADMIN",
    },
    {
      id: 6,
      name: "Máy ảnh Fujifilm",
      email: "nguyenthe@gmail.com",
      role: "USER",
    },
    {
      id: 7,
      name: "Test",
      email: "test@gmail.com",
      role: "USER",
    },
  ]);

  return (
    <AdminLayout user={user}>
      <Title>Quản lý tài khoản khách hàng</Title>
      <SearchBar>
        <Input placeholder="Tìm theo ID, tên, email..." />
        <Button>Tìm kiếm</Button>
        <AddButton>Thêm tài khoản</AddButton>
      </SearchBar>
      <DataTable
        data={customers}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Tên" },
          { key: "email", label: "Email" },
          { key: "role", label: "Vai trò" },
        ]}
        actions={(row) => (
          <>
            <ActionButton type="edit">Sửa</ActionButton>
            <ActionButton type="lock">Khóa</ActionButton>
            <ActionButton type="delete">Xóa</ActionButton>
          </>
        )}
      />
    </AdminLayout>
  );
};

export default AccountManagement;
