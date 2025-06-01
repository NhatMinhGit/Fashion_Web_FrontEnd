import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeaderAdmin.css"; // CSS riêng cho component

const HeaderAdmin = ({ user }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const socket = new SockJS("/ws");
    const stompClient = over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/orders", (message) => {
        const orders = JSON.parse(message.body);
        const prevCount = parseInt(sessionStorage.getItem("lastOrderCount") || "0", 10);
        if (orders.length !== prevCount) {
          setOrderCount(orders.length);
          setShowNotification(true);
          sessionStorage.setItem("lastOrderCount", orders.length.toString());
          playSound();
        }
      });
    });
  }, []);

  const handleBellClick = () => {
    setShowNotification(false);
    sessionStorage.setItem("lastOrderCount", "0");
    window.location.href = "/admin/order";
  };

  const playSound = () => {
    const audio = document.getElementById("order-alert-sound");
    if (audio) {
      audio.play().catch((e) => console.log("Không thể phát âm thanh:", e));
    }
  };

  return (
    <>
      {/* Audio */}
      <audio id="order-alert-sound" preload="auto">
        <source src="/assets/audio/notification.mp3" type="audio/mpeg" />
      </audio>

      {/* Header */}
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            {showNotification && (
              <div
                id="sidebar-notification-icon"
                style={{ color: "gold", fontSize: 20 }}
                className="bell-ring"
                onClick={handleBellClick}
              >
                <i className="fas fa-bell" id="bell-icon"></i>
              </div>
            )}
            {showNotification && (
              <div
                id="order-notification-info"
                className="order-notification-info"
              >
                Có {orderCount} đơn hàng mới. Bấm để xem.
              </div>
            )}
          </nav>

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-user dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#!"
              >
                <div className="avatar-sm">
                  <img
                    src="/pics/default-avatar.jpg"
                    alt="avatar"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span>{" "}
                  <span className="fw-bold">{user?.fullname}</span>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="scroll-wrapper dropdown-user-scroll scrollbar-outer">
                  <div className="dropdown-user-scroll scrollbar-outer scroll-content">
                    <li>
                      <div className="user-box">
                        <div className="avatar-lg">
                          <img
                            src="/pics/default-avatar.jpg"
                            alt="profile"
                            className="avatar-img rounded"
                          />
                        </div>
                        <div className="u-text">
                          <h4>{user?.fullname}</h4>
                          <p className="text-muted">{user?.fullname}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/user">
                        Truy cập trang Home
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/logout">
                        Đăng xuất
                      </a>
                    </li>
                  </div>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HeaderAdmin;
