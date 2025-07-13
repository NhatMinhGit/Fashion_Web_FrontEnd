import { useEffect, useState } from "react";
import api from "../../../api/api";
import Cookies from "js-cookie";
import {
  Title,
  SearchBar,
  Input,
  Button,
  AddButton,
  ActionButton,
} from "../../../components/ui/SharedStyles";
import DataTable from "../../../components/table/DataTable";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    api
      .get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAccounts(res.data))
      .catch((err) => {
        console.error("Lỗi lấy danh sách user:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
        }
      });
  }, []);

  return (
    <>
      <Title>Quản lý tài khoản khách hàng</Title>
      <SearchBar>
        <Input placeholder="Tìm theo ID, tên, email..." />
        <Button>Tìm kiếm</Button>
        <AddButton>Thêm tài khoản</AddButton>
      </SearchBar>
      <DataTable
        data={accounts}
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
    </>
  );
};

export default AccountManagement;
