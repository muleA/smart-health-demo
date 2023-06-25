import './certficate.css';

const Certificate1 =({licenseInfo,userInfo}:any) => {

return (
  <div className="container">
  <div className="header"> 
      <div className="content">
          <div className="left-header">
              <img src="https://media.licdn.com/dms/image/D4E03AQG4jgEziXXBEg/profile-displayphoto-shrink_400_400/0/1677379760383?e=1691625600&v=beta&t=6Kzp_ovzQASomlB5_6q0Y7-EYRBZ45dhtbtkHK_OtBE" alt="User" className="user-image"/>
         <div className="imagePosition">
           <img src={require("../assets/images/stamp.png" )} alt="stamp" width="170" />
          </div>
    </div>
          <div className="center-header">
             <div className='center'>
             <img src={require("../assets/images/logo2.png" )} alt="logo" width="150" style={{mixBlendMode: "multiply"}} />
             </div>
             <div className="certificate-code">
              <h1>በአዲስ አበባ ከተማ አስተዳደር</h1>
              <p>CITY ADMINSTRATION OF ADDIS ABABA</p>
              <h1>የምግብ የመድኃኒትና የጤና ክብካቤ አስተዳድርና ቁትትር ባለስልጣን </h1>
              <p>FOOD MEDICINE AND HEALTH CARE ADMINSTRATION AND CONTROL AUTHORITY</p>
            </div>
            </div>
            <div className="right-header mr-0">
              <p>የምዝገባ ቁጥር SEPHO=297/2015</p>
              <p>IDNo:34088</p>
              <p>RPL=01</p>
            </div>
          
        </div>

  <div className="content">
    <div className="left-content">
      <h2>የጤና ባለሞያዎች የሙያ ሥራ ፈቃድ የምስክር ወረቀት</h2>
      <h3>የአዲስ አበባ ከተማ አስተዳድር አስፈፃሚ ኦካላትን ለመወሰን ባወጣው አዋጅ ቁጥር 30/2004 እንቀፅ 8 ንዑስ አንቀፅ 12 ለአዲስ አበባ የምግብ የመድኃኒትና  የጤና ክብካቤ አስተዳዴርና ቁጥጥር ባለስልጣን በተሰጠ ሥልጣን መሠረት።</h3>
      <br />
      <br />
      <h1>{`${userInfo?.firstName} ${userInfo?.middleName} ${userInfo?.lastName}`}</h1>    
        <h3>ተገቢውን መስፈርት አሟልተው ስለተፕ</h3>
      <h2>በ ሲኒየር ኢንቫይሮንሜንታል ሄልዝ ፕሮፌሽናል</h2>
      <h3>ሙያ መዝግቦ ይህንን ሥራ ፈቃድ የምስክር ወረቀት ሰጥትል </h3>
      <br />
      <div className="center">
        <img src={require("../assets/images/signature1.png" )} alt="Signature" width="150"/>
      </div>
      <div className="alignLeft">

        <p>ይህ የሙያ ስራ ፈቃድ የሚያገለግለዉ ከ 29/16/2015 እስከ 29/16/2018 ዓ.ም ብቻ ነዉ</p>
        <p className='user-response'>ማሳሰቢያ</p>
        <p>ስምና ፎቶ ግራፍ ከተገለጸዉ ሰዉ በስተቀር ሴላ አካል ሲገለገልበት ኢይገባም በማንኛዉም ምከንያት ቢጠፋ ወዲያዉኑ የማሳወቅ ግዴታ አለብዎት በየሶስት ዓመቱ መታደስ አለበት።</p>
        <p>1251115586465/4251118333562  15286</p>
      </div>
     
  </div>
    <div className="right-content">
      <h2>HEALTH PROFESSIONALS LICENSING CERTIFICATE</h2>
      <h3>Food, Medicine & Health Care Administration, and Control Authority of Addi Ababa by Virtue of the power Vested on it by the Definitions of powers and Duties of Executive Organs of Addis Ababa city Administration Proclamation Number 30/2012 Article 8/12/</h3>
      <h1 className=''>{`${userInfo?.firstName} ${userInfo?.middleName} ${userInfo?.lastName}`}</h1>    
      <h3>Having duty satisfied the requirements of the Authority here by Registered and licensed as,</h3>
    
      <h2>SENIOR ENVIRONMENTAL HEALTH PROFESSIONAL</h2>
      <div className="center">
        <img src={require("../assets/images/signature1.png" )} alt="Signature" width="150"/>
      </div>
    <div className="alignLeft">
      <p>This License is valid only from Jun 6, 2023 to Saturday, June 6, 2026 GC</p>
      <p className='user-response'>N.B</p>
      <p>Unlawful if it is found being used by another person</p>
      <p>The holder is required to notify as soon as the certificate is lost or missed</p>
      <p>This Certificate shall Be renewed every three year</p>
      <p className='user-response'>Emaill proflisence@gmail.com</p>
      <p>ISSUED BY:       {`${userInfo?.firstName} ${userInfo?.middleName}`}    
</p>
      <div className="imagePosition2">
        <img src={require("../assets/images/stamp.png" )} alt="stamp" width="170" />
       </div>
    </div> 
    </div>
  </div>
  </div>
</div>
);
};
export default  Certificate1;