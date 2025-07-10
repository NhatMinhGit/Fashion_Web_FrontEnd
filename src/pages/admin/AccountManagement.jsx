import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../components/layout/AdminLayout";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #357abd;
  }
`;

const AddButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #e6f0fa;
  padding: 0.75rem;
  text-align: left;
  color: #2d3748;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
`;

const ActionButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: ${(props) =>
    props.type === "edit"
      ? "#4a90e2"
      : props.type === "lock"
      ? "#ecc94b"
      : "#e53e3e"};

  &:hover {
    background-color: ${(props) =>
      props.type === "edit"
        ? "#357abd"
        : props.type === "lock"
        ? "#d69e2e"
        : "#c53030"};
  }
`;

const AccountManagement = ({ user }) => {
  const [customers] = useState([
    {
      id: 1,
      name: "Nguyễn Trần Nhật Minh",
      email: "nhatminh9103@gmail.com",
      role: "USER",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 2,
      name: "Nguyễn Trần Nhật Minh",
      email: "nhatminh9100@gmail.com",
      role: "ADMIN",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 3,
      name: "Tun tun tun sahu",
      email: "nhatminh91003987@gmail.com",
      role: "USER",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 4,
      name: "thanggg",
      email: "nguyenduthang985@gmail.com",
      role: "USER",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 5,
      name: "Thang",
      email: "nguyen@gmail.com",
      role: "ADMIN",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 6,
      name: "Máy ảnh Fujifilm Instax Mini Evo Nâu",
      email: "nguyenthe@gmail.com",
      role: "USER",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
    {
      id: 7,
      name: "Test",
      email: "test@gmail.com",
      role: "USER",
      actions: ["Sửa", "Khóa", "Chỉnh"],
    },
  ]);

  return (
    <AdminLayout user={user}>
      <Title>Quản lý tài khoản khách hàng</Title>
      <SearchBar>
        <Input type="text" placeholder="Tìm theo ID, tên, email hoặc vai trò" />
        <Button>Tìm kiếm</Button>
        <AddButton>Thêm tài khoản</AddButton>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>TÊN</Th>
            <Th>EMAIL</Th>
            <Th>VAI TRÒ</Th>
            <Th>HÀNH ĐỘNG</Th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <Td>{customer.id}</Td>
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.role}</Td>
              <Td>
                {customer.actions.map((action, index) => (
                  <ActionButton
                    key={index}
                    type={
                      action === "Sửa"
                        ? "edit"
                        : action === "Khóa"
                        ? "lock"
                        : "delete"
                    }
                  >
                    {action}
                  </ActionButton>
                ))}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default AccountManagement;
