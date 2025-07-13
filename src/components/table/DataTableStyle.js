import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
`;

export const Th = styled.th`
  background-color: #f1f5f9;
  color: #1e293b;
  font-weight: 600;
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  background-color: #ffffff;
  transition: background-color 0.2s ease;

  &:first-child {
    border-left: 4px solid transparent;
  }
`;

// Optional: Hover effect for rows
export const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;
