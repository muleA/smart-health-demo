import {createRoot } from "react-dom/client";
import NotificationComponent from "./notification";
export const Notify = (
  type: 'success' | 'error' | 'warning' | 'info',
  message: string
)=>{
  const notificationContainer = document?.createElement('div');
  notificationContainer.id = 'notification-container';
  document?.body?.appendChild(notificationContainer);
  createRoot(notificationContainer).render(
    <NotificationComponent
      type={type}
      message={message}
      container={notificationContainer}
    />
  );
};
