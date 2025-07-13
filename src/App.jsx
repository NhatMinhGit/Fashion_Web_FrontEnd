import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import ProductManagement from "./pages/admin/Product/ProductManagement";
import AccountManagement from "./pages/admin/Account/AccountManagement";
import OrderManagement from "./pages/admin/Order/OrderManagement";
import VoucherManagement from "./pages/admin/Voucher/VoucherManagement";
import UserInfo from "./pages/user/UserInfo";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/user/info" element={<UserInfo />} />

            {/* ✅ Layout chính của admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route
                path="product-management"
                element={<ProductManagement />}
              />
              <Route
                path="account-management"
                element={<AccountManagement />}
              />
              <Route path="order-management" element={<OrderManagement />} />
              <Route
                path="voucher-management"
                element={<VoucherManagement />}
              />
            </Route>

            {/* fallback */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
