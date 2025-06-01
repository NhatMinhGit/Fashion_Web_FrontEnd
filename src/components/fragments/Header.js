import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import './header.css'; // Đảm bảo đường dẫn này đúng nếu bạn dùng file này
import $ from 'jquery'; // Lưu ý: React thường không khuyến khích dùng Jquery trực tiếp cho DOM Manipulation

const Header = ({ user, countCart, cartItems, totalOrderPrice, swalTitle, swalMessage }) => {

  useEffect(() => {
    // ... (Giữ nguyên phần session timeout của bạn) ...
    const sessionTimeoutMs = 20 * 60 * 1000;
    const warningBeforeMs = 3 * 60 * 1000;
    let timeoutWarningTimer;
    let timeoutLogoutTimer;

    const startSessionTimers = () => {
      clearTimeout(timeoutWarningTimer);
      clearTimeout(timeoutLogoutTimer);

      timeoutWarningTimer = setTimeout(showTimeoutWarning, sessionTimeoutMs - warningBeforeMs);
    };

    const showTimeoutWarning = () => {
      Swal.fire({
        title: 'Phiên làm việc sắp hết hạn!',
        text: 'Phiên làm việc của bạn sẽ tự động đăng xuất sau 2 phút. Bạn có muốn giữ phiên làm việc không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Tôi còn ở đây',
        cancelButtonText: 'Đăng xuất ngay',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('/keep-session-alive', { method: 'POST', credentials: 'same-origin' })
            .then(() => {
              startSessionTimers();
              Swal.fire('Đã giữ phiên làm việc!', '', 'success');
            })
            .catch(() => {
              Swal.fire('Lỗi khi giữ phiên làm việc!', '', 'error');
            });
        } else {
          redirectToLogout();
        }
      });

      timeoutLogoutTimer = setTimeout(() => {
        Swal.fire({
          title: 'Phiên làm việc đã hết hạn!',
          text: 'Bạn sẽ được chuyển đến trang đăng nhập để đăng nhập lại.',
          icon: 'error',
          confirmButtonText: 'Đăng nhập lại',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then(redirectToLogout);
      }, warningBeforeMs);
    };

    const redirectToLogout = () => {
      window.location.href = '/logout';
    };

    startSessionTimers();
  }, []);

  useEffect(() => {
    if (swalTitle && swalMessage) {
      Swal.fire({
        icon: swalTitle === 'Lỗi' ? 'error' : 'success',
        title: swalTitle,
        text: swalMessage,
        confirmButtonText: 'Đóng'
      });
    }
  }, [swalTitle, swalMessage]);


  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <form id="search-form" className="d-flex justify-content-center" method="GET" action="/user/shop/search">
          <div className="search-bar position-relative">
            <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm..." name="keyword" />
            <input type="hidden" name="category" value="nam" />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <h1 className="text-white">
          <img src="/pics/logo/KLTN_logo.png" alt="MNT Fashion" width="150" height="auto" className="img-fluid" />
        </h1>
        <div className="d-flex flex-wrap align-items-center">
          <Link to="/user/wishlist" className="me-3 text-light"><i className="fa-regular fa-star"></i></Link>
          <Link to="/user/chatbot" className="me-3 text-light"><i className="fa-solid fa-comment"></i></Link>
          <div className="dropdown">
            <a href="#" className="me-3 text-light position-relative" data-bs-toggle="dropdown">
              <i className="fa-solid fa-shopping-cart fa-lg"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {countCart}
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end p-3" style={{ width: '350px' }}>
              {/* SỬA LỖI TẠI ĐÂY: Kiểm tra cartItems trước khi map() */}
              {cartItems && cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.cartItemId} className="d-flex align-items-center mb-2 text-black">
                    {item.product.imageUrl ? (
                      <img src={item.product.imageUrl} className="img-fluid rounded-3" alt={item.product.name} width="50" height="50" />
                    ) : (
                      <span>No image available</span>
                    )}
                    <div className="flex-grow-1">
                      <p className="mb-1 fw-bold text-black">{item.product.name}</p>
                      <div className="d-flex flex-wrap align-items-center gap-1" style={{ fontSize: '12px', color: 'black' }}>
                        <span>Giá: <strong>{item.product.formattedPrice}</strong></span>
                        <span>| Loại: {item.product.categoryName}</span>
                        <span>| Sl: {item.quantity}</span>
                        <span>| Size: {item.sizeName}</span>
                      </div>
                    </div>
                    <form action="/user/cart/remove-from-cart" method="post">
                      <input type="hidden" name="id" value={item.cartItemId} />
                      <button type="submit" className="btn btn-link text-muted">
                        <i className="fa-solid fa-trash" style={{ color: 'red' }}></i>
                      </button>
                    </form>
                  </div>
                ))
              ) : (
                // Hiển thị thông báo nếu giỏ hàng rỗng hoặc chưa load
                <div className="text-center text-black">Giỏ hàng trống</div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total: </span>
                <span className="text-danger">{totalOrderPrice}</span>
              </div>
              <Link to="/user/cart" className="btn btn-dark w-100 mt-2">Xem giỏ hàng ({countCart})</Link>
            </div>
          </div>

          <div className="dropdown">
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
              <img src="/pics/default-avatar.jpg" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <h6 className="text-white">{user?.name}</h6>
            <ul className="dropdown-menu text-small">
              {user ? (
                <>
                  <li><Link className="dropdown-item" to="/user/profile">Hồ sơ của tôi</Link></li>
                  <li><Link className="dropdown-item" to="/user/user-order">Hóa đơn của tôi</Link></li>
                  <li><Link className="dropdown-item" to="/user/voucher">Voucher của tôi</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  {user.roles.includes('ADMIN') && (
                    <li><Link className="dropdown-item" to="/admin">Quay lại trang Admin</Link></li>
                  )}
                  <li><a className="dropdown-item" href="/logout">Đăng xuất</a></li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/login">Đăng nhập</Link></li>
                  <li><Link className="dropdown-item" to="/registration">Đăng ký</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item"><Link to="/user" className="nav-link text-black">Home</Link></li>
            <li className="nav-item"><Link to="/user/shop" className="nav-link text-black">Shop</Link></li>
            <li className="nav-item"><Link to="/branch" className="nav-link text-black">Branch</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link text-black">About</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link text-black">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;