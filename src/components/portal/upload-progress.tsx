import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosProgressEvent } from "axios";
import { Button, Progress } from "antd";

const RequestForm = () => {
  const [progress, setProgress] = useState(0);

  const handleRequest = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "https://images.unsplash.com/photo-1519612535780-b5d7d96c36f3?ixlib=rb-0.3.5\u0026q=85\u0026fm=jpg\u0026crop=entropy\u0026cs=srgb\u0026s=42c89d2eae581ba0fe58dcd0ce90ab12",
        {
          onDownloadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Update the progress value when the 'progress' state changes
    console.log("Progress updated:", progress);
  }, [progress]);

  return (
    <div>
      <Button onClick={handleRequest}>Make Request</Button>
      <Progress percent={progress} format={(percent) => `${percent}%`} />
    </div>
  );
};

export default RequestForm;
