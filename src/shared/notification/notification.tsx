import { useEffect, useState } from "react";
import { Alert } from "antd";

/* Props type */
export type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  container: HTMLDivElement;
};

/* Component */
export default function NotificationComponent(props: NotificationProps) {
  /* UI states */
  const [alert, setAlert] = useState<"success" | "error" | "warning" | "info" | null>(props.type);
  const [timer, setTimer] = useState(10);

  /* useEffect hooks */
  useEffect(() => {
    if (alert != null) {
      const timer: any = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    } else if (alert === null) {
      document.body.removeChild(props.container);
    }
  }, [alert, props.container]);

  useEffect(() => {
    if (props.type === "error") return;

    const intervalId = setInterval(() => {
      if (timer === 0) {
        clearInterval(intervalId);
      } else {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, props.type]);

  /* Event handlers */
  const handleClose = () => {
    setAlert(null);
  };

  return (
    <>
      {alert != null && (
        <Alert
          style={{
            bottom: 2,
            right: 10,
            position: "fixed",
            zIndex: 250,
            marginRight: "2px",
            display: "flex",
            alignItems: "start",
          }}
          type={props.type}
          showIcon
          onClose={handleClose}
        />
      )}
    </>
  );
}
