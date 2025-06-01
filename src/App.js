// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Đảm bảo đường dẫn này đúng

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Bạn có thể thêm một Route cho trang chủ nếu muốn, ví dụ: */}
        {/* <Route path="/" element={<HomePage />} /> */}

        {/* Route cho trang Đăng ký (registration), như bạn đã có trong LoginPage.js */}
        <Route path="/registration" element={<div>Đây là trang Đăng ký (chưa xây dựng)</div>} />

        {/* Route cho trang quên mật khẩu */}
        <Route path="/forgot-password" element={<div>Đây là trang Quên mật khẩu (chưa xây dựng)</div>} />

        {/* Nếu có bất kỳ đường dẫn nào không khớp, bạn có thể chuyển hướng hoặc hiển thị trang lỗi */}
        {/* <Route path="*" element={<div>404 - Trang không tìm thấy</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;