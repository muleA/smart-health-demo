import {  Modal, Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/auth/use-auth';
import { baseUrl } from '../../configs/config';
import { useLazyGetCertificateFileNameQuery, useLazyGetEducationFileNameQuery, useLazyGetExperienceFileNameQuery } from '../portal.query';
import { Button } from 'antd';
const PreviewFile = ({entityId,entityType }:any) => {
    console.log("entity type",entityType)
    console.log("entity Id",entityId)

  const [fileUrl, setFileUrl] = useState('');
  const {session}=useAuth()
  const [trigger,{data:educationFileName,isLoading}]=useLazyGetEducationFileNameQuery()
  useEffect(()=>{
   if(entityId && entityType==='education'){
trigger({userId:session?.userInfo?.userId,educationId:entityId})
}
  },[entityId, entityType, session?.userInfo?.userId, trigger])
  const [triggerExperience,{data:experienceFileName}]=useLazyGetExperienceFileNameQuery()
  console.log("exper file name",experienceFileName)
  useEffect(()=>{
triggerExperience({userId:session?.userInfo?.userId,experienceId:entityId})

  },[entityId, entityType, session?.userInfo?.userId, triggerExperience])

  const [triggerCertificate,{data:certificateFileName}]=useLazyGetCertificateFileNameQuery()
  useEffect(()=>{
   if(entityId && entityType==='certificate'){
    triggerCertificate({userId:session?.userInfo?.userId,certificateId:entityId})
}
  },[entityId, entityType, session?.userInfo?.userId, triggerCertificate])


  const handleDownloadClick = async () => {
    const educationFileData = `${baseUrl}user/get-education-file-by-name/${educationFileName}`;
   const experienceFileData = `${baseUrl}user/get-experience-file-by-name/${experienceFileName}`;
    const certificateFileData = `${baseUrl}user/get-certificate-file-by-name/${certificateFileName}`; 

    try {
      const response = await axios.get(entityType==='education'?educationFileData:entityType==='experience'?experienceFileData:certificateFileData, {
        responseType: 'blob',
        headers: {
          'Accept-Encoding': 'identity', // Specify the identity encoding
        },
      });

      const fileBlob = response.data;
      const fileUrl = URL.createObjectURL(fileBlob);

      setFileUrl(fileUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleCloseModal = () => {
    setFileUrl('');
  };

  return (
    
    <div>
      <Button onClick={handleDownloadClick}>Preview Attached File</Button>
      <Modal open={!!fileUrl} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', width: '50vw', height: '90vh' }}>
          <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />
        </Box>
      </Modal>
    </div>
  );
};

export default PreviewFile;
