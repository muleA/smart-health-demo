import { useState } from 'react';
import { Button, Input, Modal, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

/* Rest of the imports */

/* Rest of the code */
export interface CollectionSelectorConfig {
  multiple?: boolean;
  title?: string;
  identity?: string;
  visibleColumn: Column[];
  primaryColumn?: Column;
  endpoint?: string;
  size?: string;
  filter?: Filter[][];
}

export interface Column {
  name: string;
  key: string;
  hasLocale?: boolean;
  deep?: boolean;
  deepKey?: string;
  isTranslate?: boolean;
}

export interface Filter {
  field: string;
  fieldName: string;
  value: any;
  operator?: string;
  name?: string;
}


interface CollectionSelectorProps {
    config?: CollectionSelectorConfig;
    items?: any[];
    total?: number | undefined;
    collectionQuery?: any;
    itemsLoading?: boolean;
    title?: string;
    endPoint?: string | undefined;
    filter?: any;
    order?: any;
    hasSort?: boolean;
    inputRef?: any;
    paginationChange?: any;
    buttonLoading?: boolean;
    modalOpened: boolean;
    showFilterButton?: boolean;
    setModalOpened(event: boolean): void;
    search: (event: any) => void;
    onDone?: (event: any) => void;
    selectedRows?: any[];
  }
  interface CollectionSelectorState {
    search: string;
    selectedRows: any[];
  }
  
 export  const CollectionSelector: React.FC<CollectionSelectorProps> = ({
    config = { visibleColumn: [] },
    items = [],
    total,
    itemsLoading,
    title,
    endPoint,
    buttonLoading,
    modalOpened,
    setModalOpened,
    search,
    onDone,
    selectedRows = [],
  }) => {
    const [state, setState] = useState<CollectionSelectorState>({
      search: "",
      selectedRows,
    });
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setState((prevState) => ({ ...prevState, search: value }));
      search(value);
    };
  
    const handleRowClick = (row: any) => {
      const { multiple } = config;
      let newSelectedRows = [...state.selectedRows];
      if (multiple) {
        const index = newSelectedRows.findIndex((r) => r.id === row.id);
        if (index === -1) {
          newSelectedRows.push(row);
        } else {
          newSelectedRows.splice(index, 1);
        }
      } else {
        newSelectedRows = [row];
      }
      setState((prevState) => ({ ...prevState, selectedRows: newSelectedRows }));
    };
  
    const handleDone = () => {
      onDone && onDone(state.selectedRows);
      setModalOpened(false);
    };
  
    const { visibleColumn, size } = config;
    const { search: searchValue, selectedRows: selectedRowsValue } = state;
  
    const columns: ColumnsType<any> = visibleColumn.map((column: Column) => ({
      title: column.name,
      dataIndex: column.key,
      key: column.key,
    }));
  
    return (
      <Modal visible={modalOpened} onCancel={() => setModalOpened(false)} width={size}>
        <div>
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: "pointer" },
          })}
        />
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Button onClick={() => setModalOpened(false)}>Cancel</Button>
          <Button onClick={handleDone} disabled={!state.selectedRows.length}>
            OK
          </Button>
        </div>
      </Modal>
    );
  };