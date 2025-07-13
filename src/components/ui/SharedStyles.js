import styled from "styled-components";

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e40af; /* blue-800 */
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  align-items: center;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  flex: 1;
  min-width: 200px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  min-width: 160px;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  min-width: 100px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const AddButton = styled(Button)`
  background-color: #10b981; /* emerald-500 */
  &:hover {
    background-color: #059669; /* emerald-600 */
  }
`;

export const ActionButton = styled.button`
  background-color: ${(props) =>
    props.type === "edit"
      ? "#3B82F6" // blue-500
      : props.type === "lock"
      ? "#F59E0B" // amber-500
      : "#EF4444"}; // red-500
  color: white;
  border: none;
  margin-right: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: ${(props) =>
      props.type === "edit"
        ? "#2563EB" // blue-600
        : props.type === "lock"
        ? "#D97706" // amber-600
        : "#DC2626"}; // red-600
  }

  &:active {
    transform: scale(0.98);
  }
`;
