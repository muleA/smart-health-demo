import {  Modal, Box, Dialog, DialogTitle, DialogContentText, DialogContent } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/auth/use-auth';
import { baseUrl } from '../../configs/config';
import { useLazyGetCertificateFileNameQuery, useLazyGetEducationFileNameQuery, useLazyGetExperienceFileNameQuery } from '../portal.query';
import { Button } from 'antd';
import { DefaultDialog } from '../../shared/default-dialogue';
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
   if(entityId && entityType==='experience'){
triggerExperience({userId:session?.userInfo?.userId,experienceId:entityId})
}
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
  const styles = {
    dialog: {
      minHeight: '200px', // Set the desired minimum height here
    },
  };
  

  return (
    
      <><Button onClick={handleDownloadClick}>Preview  File</Button>



<DefaultDialog onClose={handleCloseModal}   minHeight={"90%"}  minWidth={"70%"}     
 open={!!fileUrl} title='Preview File'
>
<embed src={fileUrl} type="application/pdf" width="100%" height="100%" />

</DefaultDialog>


      </>
  );
};

export default PreviewFile;
