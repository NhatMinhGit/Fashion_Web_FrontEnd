import { useState } from "react";
import styled from "styled-components";
import api from "../../api/api.js";
import { saveTokens } from "../../utils/auth.js";
import { useNotification } from "../../context/NotificationContext";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb; /* Gray-50 background */
  padding: 1rem;
`;

// ⭐️ Card
const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
`;

// ⭐️ Title
const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937; /* Gray-800 */
  margin-bottom: 2rem;
`;

// ⭐️ Error Message
const Message = styled.p`
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

// ⭐️ Form Group
const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

// ⭐️ Label
const Label = styled.label`
  display: block;
  color: #374151; /* Gray-700 */
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

// ⭐️ Input
const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

// ⭐️ Submit Button
const Button = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  padding: 0.65rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

// ⭐️ Link Text
const LinkText = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: #4b5563;

  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function SignIn() {
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInResponse = await api.post("/auth/signin", formData);
      const { token, refreshToken } = signInResponse.data;
      saveTokens(token, refreshToken);

      // Lấy role người dùng
      const userInfoResponse = await api.get("/user/info");
      const role = userInfoResponse.data.role;

      notify("Đăng nhập thành công!", "success");

      setTimeout(() => {
        if (role === "ADMIN") navigate("/admin/dashboard", { replace: true });
        else if (role === "USER") navigate("/user/info", { replace: true });
        else setMessage("Unknown role");
      }, 1000);
    } catch (error) {
      notify(
        "Đăng nhập thất bại: " +
          (error.response?.data?.message || "Sai email hoặc mật khẩu"),
        "error"
      );
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Log In</Title>
        {message && <Message>{message}</Message>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Log In</Button>
        </form>
        <LinkText>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </LinkText>
      </FormWrapper>
    </Container>
  );
}

export default SignIn;
