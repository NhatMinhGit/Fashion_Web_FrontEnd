import React, { useState } from "react";
import "../assets/css/LoginPage.css"; // CSS riêng để tách rõ ràng
import Header from "../components/fragments/Header"; // Bạn cần tạo Header.js
import Footer from "../components/fragments/Footer"; // Bạn cần tạo Footer.js
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const query = new URLSearchParams(location.search);
  const error = query.get("error");
  const logout = query.get("logout");

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h3 className="fw-bold my-4">ĐĂNG NHẬP</h3>
          <p>
            Bạn chưa có tài khoản?{" "}
            <a href="/registration" className="text-primary">
              Đăng ký
            </a>
          </p>

          <p className="text-divider">or login here</p>

          <form action="/login" method="post">
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="username"
                id="username"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  required
                />
                <span className="toggle-password" onClick={togglePassword}>
                  👁
                </span>
              </div>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </a>
            <button type="submit" className="btn btn-primary mt-3">
              Đăng nhập
            </button>
          </form>

          {error && <div className="message">Invalid Username or Password</div>}
          {logout && <div className="message">Logout Successfully</div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
