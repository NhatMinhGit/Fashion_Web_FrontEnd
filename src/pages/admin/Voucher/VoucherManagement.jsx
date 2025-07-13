import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../../components/layout/AdminLayout";
import DataTable from "../../../components/table/DataTable";
import {
  Title,
  SearchBar,
  Input,
  Button,
  AddButton,
  ActionButton,
  Select,
} from "../../../components/ui/SharedStyles";

const VoucherManagement = ({ user }) => {
  const [vouchers] = useState([
    {
      id: 1,
      code: "FREESHIP",
      name: "freeship",
      type: "percentage",
      value: 10.0,
      startDate: "2025-05-06",
      endDate: "2025-05-15",
      applyFor: "Cho tất cả người dùng",
    },
    // thêm voucher khác nếu cần
  ]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "code", label: "MÃ" },
    { key: "name", label: "TÊN" },
    { key: "type", label: "LOẠI GIẢM GIÁ" },
    { key: "value", label: "GIÁ TRỊ GIẢM" },
    { key: "startDate", label: "NGÀY BẮT ĐẦU" },
    { key: "endDate", label: "NGÀY KẾT THÚC" },
    { key: "applyFor", label: "ÁP DỤNG CHO" },
  ];

  const renderActions = (voucher) => (
    <>
      <ActionButton
        type="edit"
        onClick={() => alert("Edit voucher " + voucher.code)}
      >
        Sửa
      </ActionButton>
      <ActionButton
        type="delete"
        onClick={() => alert("Delete voucher " + voucher.code)}
      >
        Xóa
      </ActionButton>
    </>
  );

  return (
    <>
      <Title>Quản lý Voucher</Title>
      <SearchBar>
        <Input placeholder="Tìm kiếm theo Id, mã voucher, tên voucher" />
        <Select>
          <option value="">-- Tất cả loại --</option>
          <option value="percentage">Giảm theo %</option>
          <option value="fixed">Giảm số tiền</option>
        </Select>
        <Select>
          <option value="">-- Tất cả --</option>
          <option value="active">Đang hoạt động</option>
          <option value="expired">Hết hạn</option>
        </Select>
        <Button>Lọc Voucher</Button>
      </SearchBar>
      <SearchBar>
        <AddButton>+ Thêm voucher</AddButton>
        <AddButton>+ Gán voucher cho người dùng</AddButton>
      </SearchBar>
      <DataTable data={vouchers} columns={columns} actions={renderActions} />
    </>
  );
};

export default VoucherManagement;
