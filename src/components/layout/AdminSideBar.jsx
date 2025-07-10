import React, { useState } from "react";
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
  width: ${(props) => (props.$collapsed ? "40px" : "240px")};
  color: white;
  padding: 20px;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  font-size: 18px;
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: #a0a0a0;
  margin-bottom: 10px;
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;
  cursor: pointer;
  color: #fff;
  transition: color 0.2s;

  &:hover {
    color: #facc15;
  }
`;

const IconWrapper = styled.span`
  font-size: 16px;
  margin-right: ${(props) => (props.$collapsed ? "0" : "12px")};
  display: flex;
  justify-content: center;
  width: 20px;
`;

const Label = styled.span`
  display: ${(props) => (props.$collapsed ? "none" : "inline")};
`;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaBox />, label: "Sản phẩm", path: "/admin/product-management" },
    // { icon: <FaArrowDown />, label: "Hạ giá", path: "/admin/discounts" },
    {
      icon: <FaGift />,
      label: "Khuyến mãi",
      path: "/admin/voucher-management",
    },
    {
      icon: <FaUsers />,
      label: "Tài khoản người dùng",
      path: "/admin/account-management",
    },
    {
      icon: <FaShoppingCart />,
      label: "Đơn hàng",
      path: "/admin/order-management",
    },
    // { icon: <FaChartBar />, label: "Thống kê", path: "/admin/statistics" },
    // { icon: <FaWarehouse />, label: "Quản lý kho", path: "/admin/inventory" },
    // { icon: <FaComments />, label: "Chatbot", path: "/admin/chatbot" },
    // { icon: <FaUser />, label: "Thông tin Admin", path: "/admin/info" },
  ];

  return (
    <SidebarContainer $collapsed={collapsed}>
      <LogoSection>
        {!collapsed && (
          <>
            <Logo
              src="/mnt/data/f28e0257-0970-4d33-baea-920b6044dd08.png"
              alt="Logo"
            />
            <LogoText>MNT</LogoText>
          </>
        )}
        <ToggleButton onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </ToggleButton>
      </LogoSection>

      <SectionTitle hidden={collapsed}>Danh mục quản lý</SectionTitle>
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => (window.location.href = item.path)}
          >
            <IconWrapper $collapsed={collapsed}>{item.icon}</IconWrapper>
            <Label $collapsed={collapsed}>{item.label}</Label>
          </MenuItem>
        ))}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
