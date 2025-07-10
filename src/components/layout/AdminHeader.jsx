import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { clearTokens } from "../../utils/auth";
import { useNotification } from "../../context/NotificationContext"; // ✅ Thêm dòng này

const HeaderWrapper = styled.header`
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const UserButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s ease;
  &:hover {
    background-color: #f9fafb;
  }
`;

const Username = styled.span`
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 14px;
  color: #111827;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 64px;
  right: 2rem;
  background-color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 220px;
  z-index: 1000;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show ? "0" : "-10px")});
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EmailText = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const AdminHeader = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notify } = useNotification(); // ✅ Sử dụng hook context

  const handleLogout = () => {
    clearTokens();
    notify("Đăng xuất thành công", "success"); // ✅ Gọi thông báo
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000); // Chờ một chút để người dùng thấy thông báo
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <div ref={dropdownRef}>
        <UserButton onClick={() => setOpen(!open)}>
          <FaUserCircle size={24} />
          <Username>{user?.username || "Unknown User"}</Username>
        </UserButton>

        <Dropdown show={open}>
          <DropdownItem>
            <div>
              <strong>{user?.username || "Unknown User"}</strong>
            </div>
            <EmailText>{user?.email || "No email"}</EmailText>
          </DropdownItem>
          <DropdownItem onClick={() => (window.location.href = "/")}>
            Truy cập trang Home
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>Đăng xuất</DropdownItem>
        </Dropdown>
      </div>
    </HeaderWrapper>
  );
};

export default AdminHeader;
