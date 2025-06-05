import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("logout")) {
      setSuccessMessage("Đăng xuất thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with email:", email);
      const response = await axios.post(
        "http://localhost:8080/api/login",
        new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);
      if (response.data.message === "Logged in successfully") {
        console.log(
          "Redirecting to:",
          response.data.role === "ADMIN" ? "/admin" : "/home"
        );
        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError("Tên người dùng hoặc mật khẩu không hợp lệ");
      }
    } catch (err) {
      console.error("Login error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(
        err.response?.data?.message || "Lỗi mạng: Không thể kết nối với server"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="card-title text-center mb-4">ĐĂNG NHẬP</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}
        <p className="text-center mb-4">
          Bạn chưa có tài khoản?{" "}
          <a href="/register" className="text-primary">
            Đăng ký
          </a>
        </p>
        <form onSubmit={handleLogin}>
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
          <p className="text-center mb-3">
            <a href="/forgot-password" className="text-primary">
              Quên mật khẩu?
            </a>
          </p>
          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
