import { useState, useEffect } from "react";
import SignUp from "./pages/auth/SignUp.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import UserInfo from "./pages/user/UserInfo.jsx";
import ProductManagement from "./pages/admin/ProductManagement.jsx";
import AccountManagement from "./pages/admin/AccountManagement.jsx";
import OrderManagement from "./pages/admin/OrderManagement.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderComponent = () => {
    switch (path) {
      case "/signup":
        return <SignUp />;
      case "/login":
        return <SignIn />;
      case "/admin/dashboard":
        return <AdminDashBoard />;
      case "/user/info":
        return <UserInfo />;
      case "/admin/product-management":
        return <ProductManagement />;
      case "/admin/account-management":
        return <AccountManagement />;
      case "/admin/order-management":
        return <OrderManagement />;
      default:
        return <SignIn />;
    }
  };

  return (
    <NotificationProvider>
      <div>{renderComponent()}</div>
    </NotificationProvider>
  );
}

export default App;
