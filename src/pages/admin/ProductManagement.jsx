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
  margin-right: 1rem;

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
    props.type === "edit" ? "#4a90e2" : "#e53e3e"};

  &:hover {
    background-color: ${(props) =>
      props.type === "edit" ? "#357abd" : "#c53030"};
  }
`;

const ProductManagement = ({ user }) => {
  const [products] = useState([
    {
      id: 1,
      name: "Áo polo nam dài tay vải cafe form fitted",
      brand: "Coffee Lovers Nam",
      price: 502142.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
    {
      id: 2,
      name: "Áo polo nam tay ngan vải s.cafe tron form fitted",
      brand: "Coffee Lovers Nam",
      price: 362991.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
    {
      id: 3,
      name: "Áo polo nagin tay nam S.Cafe phôi cờ Fitted",
      brand: "Coffee Lovers Nam",
      price: 454016.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
    {
      id: 4,
      name: "Áo polo tay nagin nam S.Cafe gân con.Fitted.png",
      brand: "Coffee Lovers Nam",
      price: 371476.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
    {
      id: 5,
      name: "Áo thun nam phô sọc tay S.Cafe",
      brand: "Coffee Lovers Nam",
      price: 291723.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
    {
      id: 6,
      name: "Áo thun nam tay nagin coffee cờ tron tron form loo",
      brand: "Coffee Lovers Nam",
      price: 584512.0,
      status: "Routine",
      actions: ["Sửa", "Xóa"],
    },
  ]);

  return (
    <AdminLayout user={user}>
      <Title>Quản lý sản phẩm</Title>
      <SearchBar>
        <AddButton>Thêm sản phẩm mới</AddButton>
        <AddButton>Them danh mục sản phẩm mới</AddButton>
        <Input type="text" placeholder="Nhập từ khóa" />
        <Button>Tìm kiếm</Button>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>TÊN</Th>
            <Th>DANH MỤC</Th>
            <Th>GIA</Th>
            <Th>NHÀN HÀNG</Th>
            <Th>HÀNH ĐỘNG</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.brand}</Td>
              <Td>{product.price.toLocaleString()} ₫</Td>
              <Td>{product.status}</Td>
              <Td>
                {product.actions.map((action, index) => (
                  <ActionButton
                    key={index}
                    type={action === "Sửa" ? "edit" : "delete"}
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

export default ProductManagement;
