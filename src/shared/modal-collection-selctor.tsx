import { Table, Checkbox, Modal, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CollectionSelectorConfig } from './collection-selector-config';
import { useState } from 'react';

interface Item {
  id: string;
  [key: string]: any;
}

interface CollectionSelectorProps {
  config?: CollectionSelectorConfig;
  items?: Item[];
  modalOpened: boolean;
  loading?:boolean;
  setModalOpened(event: boolean): void;
  onDone?: (event: any) => void;
}

const ModalCollectionSelector = (props: CollectionSelectorProps) => {
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const handleCheckbox = (selectedRowKeys: any, selectedRows: Item[]) => {
    setCheckedItems(selectedRows);
  };

  const rowSelection = {
    onChange: handleCheckbox,
    selectedRowKeys: checkedItems.map((item: { id: any; }) => item.id),
  };

  const handleOk = () => {
    console.log('Selected rows:', checkedItems);
    if (props.onDone) {
      props.onDone(checkedItems);
      props.setModalOpened(false);
    }
  };

  let headers: { title: string; dataIndex: string }[] = [];

  if (props.config?.visibleColumn) {
    headers = props.config?.visibleColumn?.map((col: { key: string; name: string }) => ({
      title: col.name,
      dataIndex: col.key,
    })) || [];
  }

  const rows = props.items?.map((element) => ({
    ...element,
    key: element.id,
  }));

  return (
    <Modal visible={props.modalOpened} onCancel={() => props.setModalOpened(false)} title={props.config?.title} width={700} footer={[
      <Button key="back" onClick={() => props.setModalOpened(false)}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk} className="bg-primary text-white">
        Ok
      </Button>,
    ]}>
      <Table dataSource={rows} columns={[{ title: ''}, ...headers]} rowSelection={rowSelection} />
    </Modal>
  );
};

export default ModalCollectionSelector;