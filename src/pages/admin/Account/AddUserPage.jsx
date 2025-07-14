import UserForm from "./UserForm";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

function AddUserPage() {
  const navigate = useNavigate();

  const handleAddUser = async (data) => {
    await api.post("/admin/users", data);
    notify("Tạo người dùng thành công!", "success");
    navigate("/admin/account-management");
  };

  return <UserForm onSubmit={handleAddUser} />;
}

export default AddUserPage;
