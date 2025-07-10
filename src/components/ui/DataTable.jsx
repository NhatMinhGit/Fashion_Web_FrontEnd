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
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
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
          Trang {page} / {Math.ceil(data.length / pageSize)}
        </span>
        <span>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Trước
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(data.length / pageSize)}
            style={{ marginLeft: "0.5rem" }}
          >
            Sau →
          </button>
        </span>
      </Pagination>
    </Wrapper>
  );
};

export default DataTable;
