import React from 'react';
import { Link } from 'react-router-dom';
// import './footer.css'; // đảm bảo đường dẫn đúng với nơi chứa file CSS

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Cột 1: Logo + Giới thiệu */}
                <div className="footer-brand">
                    <img src="/pics/logo/KLTN_logo.png" alt="MNT Fashion" width="150" className="img-fluid" />
                    <p>MNT Fashion là thương hiệu thời trang hàng đầu Việt Nam với phong cách hiện đại, trẻ trung.</p>
                    <p><strong>Hotline:</strong> <a href="tel:19001234">1900 1234</a></p>
                    <p><strong>Email:</strong> <a href="mailto:support@mntfashion.vn">support@mntfashion.vn</a></p>
                </div>

                {/* Cột 2 */}
                <div>
                    <h3>About Us</h3>
                    <p><Link to="/contact">Liên hệ</Link></p>
                    <p><Link to="/services">Thông tin dịch vụ</Link></p>
                    <p><Link to="/careers">Tuyển dụng</Link></p>
                    <p><Link to="/stores">Hệ thống cửa hàng</Link></p>
                </div>

                {/* Cột 3 */}
                <div>
                    <h3>Chính sách</h3>
                    <p><Link to="/warranty-policy">Chính sách bảo hành</Link></p>
                    <p><Link to="/return-policy">Chính sách đổi trả</Link></p>
                    <p><Link to="/payment-policy">Chính sách thanh toán</Link></p>
                    <p><Link to="/shopping-guide">Hướng dẫn mua hàng</Link></p>
                </div>

                {/* Cột 4 */}
                <div>
                    <h3>Hướng dẫn</h3>
                    <p><Link to="/online-shopping-guide">Mua hàng Online</Link></p>
                    <p><Link to="/payment-guide">Thanh toán</Link></p>
                    <p><Link to="/return-guide">Đổi hàng</Link></p>
                    <p><Link to="/warranty-guide">Bảo hành</Link></p>
                </div>
            </div>

            {/* Dòng dưới cùng */}
            <div className="footer-bottom">
                <p>&copy; 2025 MNT Fashion. All rights reserved.</p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-tiktok"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
