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
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import ConfirmBox from "../../../components/ui/ConfirmBox";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const { notify } = useNotification();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/admin/users/delete/${deleteId}`);
      notify("Xóa người dùng thành công", "success");
      loadUsers();
    } catch (err) {
      notify("Xóa thất bại", "error");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setAccounts(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    loadUsers();
  }, []);

  return (
    <>
      <Title>Quản lý tài khoản khách hàng</Title>
      <SearchBar>
        <Input placeholder="Tìm theo ID, tên, email..." />
        <Button>Tìm kiếm</Button>
        <AddButton onClick={() => navigate("add")}>Thêm tài khoản</AddButton>
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
            <ActionButton
              type="edit"
              onClick={() => navigate(`edit/${row.id}`)}
            >
              Sửa
            </ActionButton>
            <ActionButton type="lock">Khóa</ActionButton>
            <ActionButton
              type="delete"
              onClick={() => {
                setDeleteId(row.id);
                setConfirmOpen(true);
              }}
            >
              Xóa
            </ActionButton>
          </>
        )}
      />
      <ConfirmBox
        open={confirmOpen}
        message="Bạn có chắc chắn muốn xóa người dùng này?"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default AccountManagement;
