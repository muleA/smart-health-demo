import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../configs/config';

const FileViewer = ({ fileNameEndpoint, fileEndpoint }:any) => {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fileNameEndpoint);
        const fileName = response.data.fileName;

        const fileResponse = await axios.get(`${baseUrl}user/get-education-file-by-name/${fileName}`);
        const fileUrl = URL.createObjectURL(new Blob([fileResponse.data]));
        setFileUrl(fileUrl);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchData();
  }, [fileNameEndpoint, fileEndpoint]);

  return (
    <div>
      {fileUrl && (
        <a href={fileUrl} download>
          Download File
        </a>
      )}
    </div>
  );
};

export default FileViewer;
