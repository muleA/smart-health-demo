import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/auth/use-auth';
import { baseUrl } from '../../configs/config';
import { useLazyGetCertificateFileNameQuery, useLazyGetEducationFileNameQuery, useLazyGetExperienceFileNameQuery } from '../portal.query';
import { Button, Spin, message } from 'antd';
import { DefaultDialog } from '../../shared/default-dialogue';
const PreviewFile = ({ entityId, entityType, userId }: any) => {
  console.log("entity type", entityType)
  console.log("entity Id", entityId)

  const [fileUrl, setFileUrl] = useState('');
  const { session } = useAuth()
  const [trigger, { data: educationFileName, isLoading }] = useLazyGetEducationFileNameQuery()
  useEffect(() => {
    if (entityId && entityType === 'education') {
      trigger({ userId: session?.userInfo?.userId ?? userId, educationId: entityId })
    }
  }, [entityId, entityType, session?.userInfo?.userId, trigger, userId])
  const [triggerExperience, { data: experienceFileName,isLoading:experienceLoading }] = useLazyGetExperienceFileNameQuery()
  console.log("exper file name", experienceFileName)
  useEffect(() => {
    if (entityId && entityType === 'experience') {
      triggerExperience({ userId: session?.userInfo?.userId ?? userId, experienceId: entityId })
    }
  }, [entityId, entityType, session?.userInfo?.userId, triggerExperience, userId])

  const [triggerCertificate, { data: certificateFileName,isLoading:certificateLoading }] = useLazyGetCertificateFileNameQuery()
  useEffect(() => {
    if (entityId && entityType === 'certificate') {
      triggerCertificate({ userId: session?.userInfo?.userId ?? userId, certificateId: entityId })
    }
  }, [entityId, entityType, session?.userInfo?.userId, triggerCertificate, userId])

  const [loading, setLoading] = useState(false)
  const handleDownloadClick = async () => {
    const educationFileData = `${baseUrl}user/get-education-file-by-name/${educationFileName}`;
    const experienceFileData = `${baseUrl}user/get-experience-file-by-name/${experienceFileName}`;
    const certificateFileData = `${baseUrl}user/get-certificate-file-by-name/${certificateFileName}`;
    setLoading(true)
    try {
      const response = await axios.get(entityType === 'education' ? educationFileData : entityType === 'experience' ? experienceFileData : certificateFileData, {
        responseType: 'blob',
        headers: {
          'Accept-Encoding': 'identity', // Specify the identity encoding
        },
      });

      const fileBlob = response.data;
      const fileUrl = URL.createObjectURL(fileBlob);
      setFileUrl(fileUrl);
    } catch (error: any) {
      message.error(`ENOENT: no such file or directory,${error as string}`)
    }
    setLoading(false)
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

    <>
    {isLoading||experienceLoading||certificateLoading?(<> 
      <Spin />
    </>):(<> 
      <Button className='text-primary' onClick={handleDownloadClick}>Preview  File</Button>
      {loading && <Spin />}
      <DefaultDialog onClose={handleCloseModal} minHeight={"90%"} minWidth={"70%"}
        open={!!fileUrl} title='Preview File'
      >
        <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />

      </DefaultDialog>

    </>)}
   

    </>
  );
};

export default PreviewFile;
