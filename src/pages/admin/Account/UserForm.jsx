import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ⭐️ Wrapper
const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: 2rem auto;
`;

// ⭐️ Title
const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

// ⭐️ Form Group
const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

// ⭐️ Label
const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

// ⭐️ Input
const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #111827;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

// ⭐️ Select
const Select = styled.select`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #111827;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

// ⭐️ Button
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

const Message = styled.p`
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  background-color: #e5e7eb; /* Gray-200 */
  color: #111827; /* Gray-900 */
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #d1d5db;
  }
`;

function UserForm({ initialValues = {}, onSubmit, isEdit = false, error }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (!initialValues) return;
    setFormData((prev) => {
      if (
        prev.name === (initialValues.name || "") &&
        prev.email === (initialValues.email || "") &&
        prev.role === (initialValues.role || "USER")
      ) {
        return prev;
      }
      return {
        name: initialValues.name || "",
        email: initialValues.email || "",
        password: "",
        role: initialValues.role || "USER",
      };
    });
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <BackButton type="button" onClick={() => navigate(-1)}>
        ← Quay lại
      </BackButton>

      <Title>{isEdit ? "Edit User" : "Add User"}</Title>

      {error && <Message>{error}</Message>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isEdit} // thường không cho đổi email khi edit
          />
        </FormGroup>

        <FormGroup>
          <Label>Password {isEdit && "(Leave blank to keep current)"}</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isEdit ? "••••••" : ""}
            required={!isEdit}
          />
        </FormGroup>

        <FormGroup>
          <Label>Role</Label>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </Select>
        </FormGroup>

        <Button type="submit">{isEdit ? "Update User" : "Create User"}</Button>
      </form>
    </FormContainer>
  );
}

export default UserForm;
