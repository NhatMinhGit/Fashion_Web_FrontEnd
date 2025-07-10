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

const Select = styled.select`
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
`;

const OrderManagement = ({ user }) => {
  const [orders] = useState([
    {
      id: 1,
      customer: "Nguyễn Trần Nhật Minh",
      date: "2024-04-12",
      total: 1178000.0,
      status: "SHIPPED",
      actions: ["Xem"],
    },
  ]);

  return (
    <AdminLayout user={user}>
      <Title>Quản lý hóa đơn</Title>
      <SearchBar>
        <Input type="text" placeholder="Tìm theo mã đơn hoặc khách hàng" />
        <Select>
          <option value="Tất cả">Tất cả</option>
        </Select>
        <Input type="date" placeholder="Từ ngày" />
        <Input type="date" placeholder="Đến ngày" />
        <Button>Lọc đơn hàng</Button>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>KHÁCH HÀNG</Th>
            <Th>NGÀY ĐẶT</Th>
            <Th>TỔNG TIỀN</Th>
            <Th>TRẠNG THÁI</Th>
            <Th>HÀNH ĐỘNG</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.date}</Td>
              <Td>{order.total.toLocaleString()} ₫</Td>
              <Td>{order.status}</Td>
              <Td>
                {order.actions.map((action, index) => (
                  <ActionButton key={index}>{action}</ActionButton>
                ))}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default OrderManagement;
