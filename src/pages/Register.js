import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Họ và Tên không được để trống");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setError("Mật khẩu không khớp");
      return;
    }
    setPasswordMismatch(false);

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
      });
      if (response.data.message === "Registered Successfully!") {
        setSuccessMessage(
          "Đăng ký thành công! Đang chuyển hướng tới trang đăng nhập..."
        );
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="card-title text-center mb-4">ĐĂNG KÝ</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}
        <p className="text-center mb-4">
          Bạn đã có tài khoản?{" "}
          <a href="/login" className="text-primary">
            Đăng nhập
          </a>
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Họ và Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y pe-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Xác nhận Mật khẩu</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMismatch(password !== e.target.value);
              }}
              className="form-control"
              required
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y pe-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              👁
            </span>
            {passwordMismatch && (
              <div className="text-danger mt-1">Mật khẩu không khớp.</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
