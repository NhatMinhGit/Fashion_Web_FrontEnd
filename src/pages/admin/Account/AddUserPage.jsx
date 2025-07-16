import UserForm from "./UserForm";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";

function AddUserPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleAddUser = async (data) => {
    try {
      await api.post("/admin/users", data);
      notify("Tạo người dùng thành công!", "success");
      navigate("/admin/account-management");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(error.response.data, "error");
      } else {
        notify("Email đã tồn tại!", "error");
      }
    }
  };

  return <UserForm onSubmit={handleAddUser} />;
}

export default AddUserPage;
