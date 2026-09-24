import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface TimerDataProps {
  createTime: any;
}

export const MinuteTimer: React.FC<TimerDataProps> = ({ createTime }) => {
  const [orderTimer, setOrderTimer] = useState("00:00:00");

  useEffect(() => {
    const startTime = dayjs(createTime);

    const timerInterval = setInterval(() => {
      const now = dayjs();
      const diffInSeconds = now.diff(startTime, "second");

      const hours = Math.floor(diffInSeconds / 3600);
      //   const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const minutes = hours * 60 + Math.floor((diffInSeconds % 3600) / 60);
    //   const seconds = diffInSeconds % 60;

      setOrderTimer(
        // `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}`
        // `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        `${String(minutes).padStart(3, "0")} Min`
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [createTime]);

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{orderTimer}</p>
    </div>
  );
};