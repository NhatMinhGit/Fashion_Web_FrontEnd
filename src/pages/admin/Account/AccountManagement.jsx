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
  const [keyword, setKeyword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const { notify } = useNotification();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toggleStatusId, setToggleStatusId] = useState(null);
  const [toggleStatusValue, setToggleStatusValue] = useState(true);

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

  const loadUsers = async (page = 1, searchKeyword = keyword) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/admin/users?page=${page}&size=10${
          keyword ? `&keyword=${keyword}` : ""
        }`
      );

      setAccounts(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadUsers(1, keyword);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    loadUsers(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      loadUsers(newPage);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    setToggleStatusId(id);
    setToggleStatusValue(!currentStatus);
    setConfirmOpen(true);
  };

  const handleToggleStatusConfirmed = async () => {
    try {
      await api.put(
        `/admin/users/change-status/${toggleStatusId}?status=${toggleStatusValue}`
      );
      notify("Cập nhật trạng thái thành công!", "success");
      loadUsers(currentPage);
    } catch (err) {
      notify("Cập nhật trạng thái thất bại!", "error");
    } finally {
      setToggleStatusId(null);
      setToggleStatusValue(true);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Title>Quản lý tài khoản khách hàng</Title>
      <SearchBar>
        <Input
          placeholder="Tìm theo ID, tên, email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
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
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actions={(row) => (
          <>
            <ActionButton
              type="edit"
              onClick={() => navigate(`edit/${row.id}`)}
            >
              Sửa
            </ActionButton>
            <ActionButton
              type={row.status ? "lock" : "unlock"}
              style={{
                backgroundColor: row.status ? "#f97316" : "#22c55e", // orange or green
                color: "#fff",
              }}
              onClick={() => handleToggleStatus(row.id, row.status)}
            >
              {row.status ? "Khóa" : "Mở khóa"}
            </ActionButton>
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
        message={
          deleteId
            ? "Bạn có chắc chắn muốn xóa người dùng này?"
            : toggleStatusValue
            ? "Bạn có chắc chắn muốn MỞ KHÓA tài khoản này?"
            : "Bạn có chắc chắn muốn KHÓA tài khoản này?"
        }
        onConfirm={
          deleteId ? handleDeleteConfirmed : handleToggleStatusConfirmed
        }
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
          setToggleStatusId(null);
        }}
      />
    </>
  );
};

export default AccountManagement;
