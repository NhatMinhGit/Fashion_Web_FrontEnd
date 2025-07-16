import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import api from "../../../api/api";
import { useParams } from "react-router-dom";
import Loading from "../../../components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";

function EditUserPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { userId } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/admin/users/user/${userId}`)

      .then((res) => {
        setInitialValues(res.data);
      })
      .catch(() => setError("Failed to load user"));
  }, [userId]);

  const handleEditUser = async (data) => {
    await api.put(`/admin/users/update/${userId}`, data);
    notify("Cập nhật người dùng thành công!", "success");
    navigate("/admin/account-management");
  };

  if (!initialValues) return <Loading />;

  return (
    <UserForm
      initialValues={initialValues}
      onSubmit={handleEditUser}
      isEdit
      error={error}
    />
  );
}

export default EditUserPage;
