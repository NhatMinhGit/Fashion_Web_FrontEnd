import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// ⭐️ Wrapper
const FormContainer = styled.div`
  background-color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 2rem auto;
`;

// ⭐️ Title
const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
`;

// ⭐️ Label
const Label = styled.label`
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

// ⭐️ Input
const Input = styled.input`
  border: none;
  border-bottom: 2px solid #d1d5db;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #111827;
  background-color: transparent;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// ⭐️ Select
const Select = styled.select`
  border: none;
  border-bottom: 2px solid #d1d5db;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #111827;
  background-color: transparent;

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
  padding: 0.75rem;
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

// ⭐️ Message
const Message = styled.p`
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

// ⭐️ Back Button
const BackButton = styled.button`
  margin-bottom: 1.5rem;
  background-color: #e5e7eb;
  color: #111827;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const FloatingInput = styled.input`
  width: 100%;
  padding: 1rem 0 0.25rem 0;
  border: none;
  border-bottom: 2px solid #d1d5db;
  background: transparent;
  color: #111827;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -0.75rem;
    left: 0;
    font-size: 0.75rem;
    color: #3b82f6;
  }

  &::placeholder {
    color: transparent;
  }

  transition: border-color 0.2s;
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 0;
  color: #6b7280; /* Gray-500 */
  font-size: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const SelectLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #3b82f6;
  font-weight: 500;
`;

function UserForm({ initialValues = {}, onSubmit, isEdit = false, error }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      reset({
        name: initialValues.name || "",
        email: initialValues.email || "",
        password: "",
        role: initialValues.role || "USER",
      });
    }
  }, [initialValues, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormContainer>
      <BackButton type="button" onClick={() => navigate(-1)}>
        ← Quay lại
      </BackButton>

      <Title>{isEdit ? "Edit User" : "Add User"}</Title>

      {error && <Message>{error}</Message>}

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormGroup>
          <FloatingInput
            type="text"
            placeholder=" "
            {...register("name", {
              required: "Bạn chưa nhập trường này!",
              pattern: {
                value: /^[A-Za-zÀ-ỹ\s]+$/u,
                message: "Tên chỉ chứa các ký tự và khoản trắng!",
              },
            })}
          />
          <FloatingLabel>Tên</FloatingLabel>
          {errors.name && <Message>{errors.name.message}</Message>}
        </FormGroup>

        <FormGroup>
          <FloatingInput
            type="email"
            placeholder=" "
            {...register("email", {
              required: "Bạn chưa nhập trường này!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ!",
              },
            })}
          />
          <FloatingLabel>Email</FloatingLabel>
          {errors.email && <Message>{errors.email.message}</Message>}
        </FormGroup>

        <FormGroup>
          <FloatingInput
            type="password"
            placeholder=" "
            {...register("password", {
              validate: (value) =>
                isEdit
                  ? true // Nếu edit cho phép bỏ trống
                  : value.length >= 8 || "Mật khẩu phải từ 8 ký tự trở lên!",
            })}
          />
          <FloatingLabel>
            Password {isEdit && "(Để trống nếu không thay đổi)"}
          </FloatingLabel>
          {errors.password && <Message>{errors.password.message}</Message>}
        </FormGroup>

        <SelectGroup>
          <SelectLabel>Vai Trò</SelectLabel>
          <Select {...register("role", { required: true })}>
            <option value="USER">Người dùng</option>
            <option value="ADMIN">Quản trị viên</option>
          </Select>
          {errors.role && <Message>Vai trò là bắt buộc</Message>}
        </SelectGroup>

        <SubmitButton type="submit">
          {isEdit ? "Update User" : "Create User"}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default UserForm;
