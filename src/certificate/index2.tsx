import React from "react";
import  './index2.css'
const CertificateDesign = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="content">
          <div className="left-header">
            <img src="" />
          </div>
          <div className="center-header">
            <img src="" />
            <div className="certificate-code">
              <h1>በአዲስ አበባ ከተማ አስተዳደር የምግብ፣የመድኃኒትና</h1>
              <h1>የጤና ክብካቤ አስተዳደርና ቁጥጥር ባለስልጣን </h1>
              <h1>የቴሌሄልዝ ሴንተር የብቃት ማረጋገጫ</h1>
            </div>
          </div>
          <div className="right-header border">
            <p> ቁጥር ጤ/ተ/ባ </p>
            <p>ቅን 16/05/2015 ዓ.ም</p>
          </div>
        </div>
      </div>

      <div>
        <div className="content">
          <p>የድርጅቱ ስምና ደረጃ</p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            አቢሲht: 'bold' አቢሲኒያ መድኃኒት ቤት ቁጥር.5
          </p>
        </div>
        <div className="content">
          <p>የድርጅቱ አድራሻ፤ መስተዳድር </p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>አ/አ</p>
          <p>ክ/ከተማ</p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            ን/ስ/ሳ
          </p>
          <p> ወረዳ</p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>06</p>
          <p>የቤት ቁጥር</p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            3495
          </p>
          <p>የስልክ ቁጥር </p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            090930097848
          </p>
        </div>
        <div className="content">
          <p>የድርጅቱ ባለንብረት ስም</p>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            አቶ ሳምሶን አሰፋ
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesign;
