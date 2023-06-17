import React from "react";
import { Modal } from "antd";
import GenerateCertificate from "../../shared/generate-certificate1";
import GenerateCertificate2 from "../../shared/generate-certificate2";
import GenerateCertificate3 from "../../shared/generate-certificate3";
import GenerateCertificate4 from "../../shared/generate-certificate4";
import GenerateCertificate5 from "../../shared/generate-certificate5";

const Certificate = (props:{licenseInfo:any,handleModalClose: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,modalVisible: boolean | undefined}) => {
 
  return (
    <Modal
    visible={props.modalVisible}
    width={1000}
    title="My License"
    onCancel={props.handleModalClose}
  
  >

<GenerateCertificate5 licenseInfo={props?.licenseInfo}/>

    </Modal>
  );
};

export default Certificate;
