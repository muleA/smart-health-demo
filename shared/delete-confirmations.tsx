import { Modal, Typography, Button, Spin } from "antd";

/* Component props */
type ConfirmModalProps = {
  setModalOpen: (value: boolean) => void;
  modalOpen: boolean;
  title: string;
  message: string;
  type: "error" | "success" | "info" | "warning";
  customOkText?: string;
  customCancelText?: string;
  onOk?: any;
  onCancel?: () => void;
  loading?: boolean;
  hideCancelButton?: boolean;
};

const { Text } = Typography;

export const ConfirmModal = (props: ConfirmModalProps): JSX.Element => {
  /* Event handlers */
  const onOk = async (): Promise<void> => {
    if (props?.onOk) {
      props?.onOk();
    }
    props?.setModalOpen(false);
  };

  const onCancel = (): void => {
    if (props?.onCancel) {
      props?.onCancel();
    }
    props?.setModalOpen(false);
  };

  return (
    <Modal
      visible={props.modalOpen}
      onCancel={onCancel}
      footer={null}
      centered
      maskClosable={false}
    >
      <div>
        <Text strong>{props.title}</Text>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Text>{props.message}</Text>
      </div>
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", columnGap: 8 }}>
        {!props.hideCancelButton && (
          <Button onClick={onCancel}>
            {props.loading ? <Spin size={"default"} /> : props.customCancelText || "Cancel"}
          </Button>
        )}
        <Button type="primary" onClick={onOk} disabled={props.loading}>
          {props.loading ? <Spin size={"default"} /> : props.customOkText || "OK"}
        </Button>
      </div>
    </Modal>
  );
};
