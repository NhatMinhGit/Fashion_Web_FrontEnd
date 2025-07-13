import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #e6f0fa;
`;

const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #eee;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  font-size: 0.875rem;
  color: #4b5563;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#e5e7eb" : "#3b82f6")};
  color: ${(props) => (props.disabled ? "#9ca3af" : "#ffffff")};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#e5e7eb" : "#2563eb")};
  }
`;

const PageNumber = styled.button`
  background-color: ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#374151")};
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  margin: 0 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? "#2563eb" : "#e5e7eb")};
  }
`;

const PageNumbersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  pageSize = 6,
  actions = () => [],
}) => {
  const [sortField, setSortField] = useState(null);
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const handleSort = (field) => {
    setAsc(field === sortField ? !asc : true);
    setSortField(field);
  };

  const sortedData = sortField
    ? [...data].sort((a, b) => {
        if (a[sortField] < b[sortField]) return asc ? -1 : 1;
        if (a[sortField] > b[sortField]) return asc ? 1 : -1;
        return 0;
      })
    : data;

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedData.map((row) => row.id);
    const allSelected = currentPageIds.every((id) => selected.includes(id));
    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  return (
    <Wrapper>
      <Table>
        <Thead>
          <tr>
            {/* <Th>
              <Checkbox
                checked={paginatedData.every((row) =>
                  selected.includes(row.id)
                )}
                onChange={toggleSelectAll}
              />
            </Th> */}
            {columns.map((col) => (
              <Th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}
              </Th>
            ))}
            <Th>Hành động</Th>
          </tr>
        </Thead>
        <tbody>
          {loading ? (
            <tr>
              <Td colSpan={columns.length + 2}>Đang tải dữ liệu...</Td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <Td colSpan={columns.length + 2}>Không có dữ liệu</Td>
            </tr>
          ) : (
            paginatedData.map((row) => (
              <Tr key={row.id}>
                {/* <Td>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </Td> */}
                {columns.map((col) => (
                  <Td key={col.key}>{row[col.key]}</Td>
                ))}
                <Td>{actions(row)}</Td>
              </Tr>
            ))
          )}
        </tbody>
      </Table>
      <Pagination>
        <span>
          Trang <strong>{page}</strong> / {Math.ceil(data.length / pageSize)}
        </span>
        <PageNumbersWrapper>
          <PageButton
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Trước
          </PageButton>

          {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
            <PageNumber
              key={i + 1}
              $active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageNumber>
          ))}

          <PageButton
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(data.length / pageSize)}
          >
            Sau
          </PageButton>
        </PageNumbersWrapper>
      </Pagination>
    </Wrapper>
  );
};

export default DataTable;
