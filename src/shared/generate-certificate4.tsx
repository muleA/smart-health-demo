import { Button } from "antd";
import React from "react";
import Certificate4 from "../certificates/specialty-center";

const GenerateCertificate4 = ({ licenseInfo,ApplicationlicenseInfo }: any) => {
  return (
    <>

      <Certificate4 licenseInfo={licenseInfo} ApplicationlicenseInfo={ApplicationlicenseInfo} />
    </>
  );
};

export default GenerateCertificate4;
