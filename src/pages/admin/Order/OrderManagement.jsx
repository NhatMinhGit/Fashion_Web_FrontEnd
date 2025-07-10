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
  Select,
  ActionButton,
} from "../../../components/ui/SharedStyles";

const OrderManagement = ({ user }) => {
  const [orders] = useState([
    {
      id: 1,
      customer: "Nguyễn Trần Nhật Minh",
      date: "2024-04-12",
      total: 1178000.0,
      status: "SHIPPED",
    },
    {
      id: 2,
      customer: "Nguyễn Văn A",
      date: "2024-05-01",
      total: 245000,
      status: "PROCESSING",
    },
  ]);

  const [filters, setFilters] = useState({
    keyword: "",
    status: "Tất cả",
    fromDate: "",
    toDate: "",
  });

  const handleFilter = () => {
    // TODO: Thực hiện lọc thật khi có backend
    console.log("Đang lọc với:", filters);
  };

  return (
    <AdminLayout user={user}>
      <Title>Quản lý hóa đơn</Title>
      <SearchBar>
        <Input
          placeholder="Tìm mã đơn hoặc tên khách"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>
        <Input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
        <Input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />
        <Button onClick={handleFilter}>Lọc đơn hàng</Button>
      </SearchBar>

      <DataTable
        data={orders}
        columns={[
          { key: "id", label: "Mã đơn" },
          { key: "customer", label: "Khách hàng" },
          { key: "date", label: "Ngày đặt" },
          {
            key: "total",
            label: "Tổng tiền",
            render: (value) => `${value.toLocaleString()} ₫`,
          },
          { key: "status", label: "Trạng thái" },
        ]}
        actions={(row) => (
          <ActionButton type="edit" onClick={() => alert(`Xem đơn ${row.id}`)}>
            Xem
          </ActionButton>
        )}
      />
    </AdminLayout>
  );
};

export default OrderManagement;
