import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 여기에서 알림을 가져오거나 수신하는 로직을 구현합니다.
    // 예를 들어, WebSocket 또는 서버 폴링을 사용할 수 있습니다.
  }, []);

  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen);
  };

  const clearNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <div className="relative">
      <Button onClick={toggleNotificationCenter} variant="ghost" size="icon">
        <Bell />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            {notifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-2 p-2 bg-gray-100 rounded"
                >
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p>{notification.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <small>{notification.timestamp.toLocaleString()}</small>
                    <Button
                      onClick={() => clearNotification(notification.id)}
                      size="sm"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
