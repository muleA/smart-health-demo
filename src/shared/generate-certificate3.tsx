import React from "react";
import Certificate3 from "../certificates/retail-pharmacy";

const GenerateCertificate3 = ({ licenseInfo,ApplicationlicenseInfo ,userInfo}: any) => {
  return (
    <>
      <Certificate3 licenseInfo={licenseInfo}  ApplicationlicenseInfo={ApplicationlicenseInfo} userInfo={userInfo}/>
    </>
  );
};

export default GenerateCertificate3;
