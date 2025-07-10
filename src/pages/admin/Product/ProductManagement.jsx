import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../../components/layout/AdminLayout";
import DataTable from "../../../components/ui/DataTable";
import {
  Title,
  SearchBar,
  Input,
  AddButton,
  Button,
  ActionButton,
} from "../../../components/ui/SharedStyles";

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   background-color: ${(props) => props.bg || "#4a90e2"};
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 0.875rem;
//   cursor: pointer;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

const ProductManagement = ({ user }) => {
  const [products] = useState([
    {
      id: 1,
      name: "Áo polo nam dài tay vải cafe form fitted",
      brand: "Coffee Lovers Nam",
      price: 502142,
      status: "Routine",
    },
    {
      id: 2,
      name: "Áo polo nam tay ngắn vải s.cafe trơn form fitted",
      brand: "Coffee Lovers Nam",
      price: 362991,
      status: "Routine",
    },
    {
      id: 3,
      name: "Áo polo nam tay ngắn S.Cafe phôi cờ Fitted",
      brand: "Coffee Lovers Nam",
      price: 454016,
      status: "Routine",
    },
    {
      id: 4,
      name: "Áo polo tay ngắn nam S.Cafe gân cổ Fitted",
      brand: "Coffee Lovers Nam",
      price: 371476,
      status: "Routine",
    },
    {
      id: 5,
      name: "Áo thun nam phối sọc tay S.Cafe",
      brand: "Coffee Lovers Nam",
      price: 291723,
      status: "Routine",
    },
    {
      id: 6,
      name: "Áo thun nam tay ngắn coffee phối cờ",
      brand: "Coffee Lovers Nam",
      price: 584512,
      status: "Routine",
    },
  ]);

  return (
    <AdminLayout user={user}>
      <Title>Quản lý sản phẩm</Title>
      <SearchBar>
        <Button bg="#4caf50">Thêm sản phẩm mới</Button>
        <Button bg="#4caf50">Thêm danh mục sản phẩm</Button>
        <Input type="text" placeholder="Nhập từ khóa" />
        <Button>Tìm kiếm</Button>
      </SearchBar>

      <DataTable
        data={products}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Tên" },
          { key: "brand", label: "Danh mục" },
          {
            key: "price",
            label: "Giá",
            render: (value) => `${value.toLocaleString()} ₫`,
          },
          { key: "status", label: "Trạng thái" },
        ]}
        actions={(row) => (
          <>
            <ActionButton
              type="edit"
              style={{ marginRight: "0.5rem" }}
              onClick={() => alert(`Sửa sản phẩm ID ${row.id}`)}
            >
              Sửa
            </ActionButton>
            <ActionButton
              type="delete"
              onClick={() => alert(`Xóa sản phẩm ID ${row.id}`)}
            >
              Xóa
            </ActionButton>
          </>
        )}
      />
    </AdminLayout>
  );
};

export default ProductManagement;
