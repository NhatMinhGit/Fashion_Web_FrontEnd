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
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import GuestRoute from "./components/route/GuestRoute.jsx";
import AddUserPage from "./pages/admin/Account/AddUserPage";
import EditUserPage from "./pages/admin/Account/EditUserPage";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route path="/user/info" element={<UserInfo />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route
                path="product-management"
                element={<ProductManagement />}
              />
              <Route
                path="account-management"
                element={<AccountManagement />}
              />

              <Route path="account-management/add" element={<AddUserPage />} />
              <Route
                path="account-management/edit/:userId"
                element={<EditUserPage />}
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
