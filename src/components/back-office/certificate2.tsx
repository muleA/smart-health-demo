import React from "react";
import { Modal } from "antd";
import Certificate1 from "../../certificates/health-proffessional";
import Certificate3 from "../../certificates/retail-pharmacy";
import Certificate4 from "../../certificates/specialty-center";
import Certificate5 from "../../certificates/certificate5";

const Certificate = (props:{licenseInfo:any,handleModalClose: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,modalVisible: boolean | undefined,appCat:string}) => {
 console.log("props.licenseInfo",props?.licenseInfo)
  return (
    <Modal
    visible={props.modalVisible}
    width={1000}
    title="My License"
    onCancel={props.handleModalClose}
  
  >

{
props?.appCat==='CompetencyCertificateforGeneralHospital' && <Certificate5 licenseInfo={props?.licenseInfo}/>

}
{
props?.appCat==='CompetencyCertificateforSpecialtyCenter' && <Certificate4 licenseInfo={props?.licenseInfo}/>

}
{
props?.appCat==='CompetencyCertificateforRetailPharmacy' && <Certificate3 licenseInfo={props?.licenseInfo}/>

}
{
  props?.appCat==='HealthProffessional' &&
 <Certificate1 licenseInfo={props?.licenseInfo}/>

}

    </Modal>
  );
};

export default Certificate;
