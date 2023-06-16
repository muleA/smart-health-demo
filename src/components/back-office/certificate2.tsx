import React from "react";
import { Modal } from "antd";
import GenerateCertificate from "../../shared/generate-certificate1";
import Certificate2 from "../../certificates/certificate2";
import Certificate3 from "../../certificates/certificate3";

const Certificate = (props:{licenseInfo:any,handleModalClose: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,modalVisible: boolean | undefined}) => {
 
  return (
    <Modal
    visible={props.modalVisible}
    width={1000}
    title="My License"
    onCancel={props.handleModalClose}
  
  >

<Certificate3 licenseInfo={props?.licenseInfo}/>

    </Modal>
  );
};

export default Certificate;
