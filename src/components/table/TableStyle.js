// src/components/table/TableStyles.js
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
  background-color: #e6f0fa;
  padding: 0.75rem;
  text-align: left;
  color: #2d3748;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #357abd;
  }
`;

export const ActionButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: ${(props) =>
    props.type === "edit"
      ? "#4a90e2"
      : props.type === "delete"
      ? "#e53e3e"
      : "#ecc94b"};

  &:hover {
    background-color: ${(props) =>
      props.type === "edit"
        ? "#357abd"
        : props.type === "delete"
        ? "#c53030"
        : "#d69e2e"};
  }
`;
