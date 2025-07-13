import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaBars,
  FaBox,
  FaArrowDown,
  FaGift,
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaWarehouse,
  FaComments,
  FaTachometerAlt,
} from "react-icons/fa";

const SidebarContainer = styled.div`
  position: fixed; /* 👈 thêm dòng này */
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #12172d;
  width: ${(props) => (props.$collapsed ? "50px" : "240px")};
  color: white;
  padding: 20px;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  height: 100vh;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-center;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 1rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #374151;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #374151;
  }

  &.active {
    background-color: #3b82f6;
    border-right: 3px solid #60a5fa;
  }

  svg {
    margin-right: ${(props) => (props.$collapsed ? "0" : "0.75rem")};
    min-width: 20px;
  }

  span {
    display: ${(props) => (props.$collapsed ? "none" : "block")};
  }
`;

const menuItems = [
  { icon: FaTachometerAlt, label: "Dashboard", path: "/admin/dashboard" },
  { icon: FaBox, label: "Sản phẩm", path: "/admin/product-management" },
  { icon: FaGift, label: "Khuyến mãi", path: "/admin/voucher-management" },
  {
    icon: FaUsers,
    label: "Tài khoản người dùng",
    path: "/admin/account-management",
  },
  { icon: FaShoppingCart, label: "Đơn hàng", path: "/admin/order-management" },

  // { icon: <FaArrowDown />, label: "Hạ giá", path: "/admin/discounts" },

  // { icon: <FaChartBar />, label: "Thống kê", path: "/admin/statistics" },
  // { icon: <FaWarehouse />, label: "Quản lý kho", path: "/admin/inventory" },
  // { icon: <FaComments />, label: "Chatbot", path: "/admin/chatbot" },
  // { icon: <FaUser />, label: "Thông tin Admin", path: "/admin/info" },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <SidebarContainer $collapsed={collapsed}>
      <LogoSection>
        <ToggleButton onClick={() => setCollapsed(!collapsed)}>
          <Logo
            src="/mnt/data/f28e0257-0970-4d33-baea-920b6044dd08.png"
            alt="Logo"
          />
          <FaBars />
        </ToggleButton>
      </LogoSection>

      <NavList>
        {menuItems.map((item) => (
          <NavItem key={item.path}>
            <StyledNavLink
              to={item.path}
              $collapsed={collapsed}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </StyledNavLink>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default AdminSidebar;
