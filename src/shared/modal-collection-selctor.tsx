import { useEffect, useState } from 'react';
import { Checkbox, Input, Modal, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { localPipe } from './local';
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

export function ModalCollectionSelector(props: CollectionSelectorProps) {
  /* Rest of the code */

  const [checkedItems, setCheckedItems] = useState<any[]>(props?.selectedRows ? props?.selectedRows : []);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [order, setOrder] = useState('ASC');

  /* Rest of the code */

  const checkAll = (event: any) => {
    if (event.target.checked) {
      setCheckedItems(props?.items ? props?.items : []);
      setIsCheckAll(true);
    } else {
      setCheckedItems([]);
      setIsCheckAll(false);
    }
  };
  const childeView = (item: any, keys: string[]) => {
    if (keys.length && item) {
      keys.forEach((key: any) => {
        if (item[key] !== null && item[key] !== undefined) {
          item = item[key];
        } else {
          item = '';
        }
      });
    }

    return item;
  };

  const handleCheckbox = (event: any, element: any) => {
    if (event.target.checked) {
      setCheckedItems((prev) => [...prev, element]);
    } else {
      const checked = checkedItems.filter((e) => e.id !== element.id);
      setCheckedItems(checked);
      setIsCheckAll(false);
    }
  };

  /* Rest of the code */

  const headers = props.config?.visibleColumn?.map((column) => (
    <th key={Array.isArray(column.key) ? column.key[0] : column.key}>
      <div className="flex">
        <div>
          {column.isTranslate ? column?.name ? column.name : '' : column?.name}
        </div>
      
      </div>
    </th>
  ));

  const checkIsChecked = (element: any) => {
    if (Array.isArray(checkedItems)) {
      const found = checkedItems?.some((el) => el?.id === element.id) ?? [];
      if (found) return true;
      return false;
    }
  };

  const rows = props?.items?.map((element: any, index: number) => (
    <tr key={index} className="group">
      <td>
        <Checkbox
          onChange={(event) => handleCheckbox(event, element)}
          checked={checkIsChecked(element)}
        />
      </td>
      {props.config?.visibleColumn.map((column) => {
        if (column?.deep && column?.deepKey) {
          return (
            <td>
              <ul>
                {element[column.key]?.map((item: any) => (
                  <li className={'list-disc'} key={item?.toString()}>
                    {column.hasLocale
                      ? localPipe(item[`${column.deepKey}`],"en")
                      : item[`${column.name}`]}
                  </li>
                ))}
              </ul>
            </td>
          );
        }
        return (
          <td>
            {!Array.isArray(column.key)
              ? column.hasLocale
                ? localPipe(element[column.key], "en")
                : element[column.key]
              : childeView(element, column.key)}
          </td>
        );
      })}
    </tr>
  ));

  /* Rest of the code */

  return (
   <>
        <Modal
        visible={props?.modalOpened}
        onCancel={()=>props?.setModalOpened(false)}
        onOk={()=>props?.setModalOpened(false)}
        width={800}
        centered
        title={props.title}
        okText={'OK'}
        cancelText={'Cancel'}
      >
        <div className="flex items-center mb-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder={'Search'}
            onChange={props?.search}
            className="mr-2"
          />
         {/*  {props.hasSelectAll && (
            <Checkbox onChange={checkAll} checked={isCheckAll}>
              {t('Select All')}
            </Checkbox>
          )} */}
        </div>
        <Table
          columns={headers as ColumnsType<any> | undefined}
          dataSource={props?.items}
          rowKey={(record) => record.id}
          pagination={false}
        >
          {rows}
        </Table>
   
      </Modal>
    </>
  );
}
