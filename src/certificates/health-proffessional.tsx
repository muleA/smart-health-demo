import { useGetUserByIdQuery } from '../components/back-office.query';
import { useGetEmployeeByEmployeeIdQuery } from '../components/back-office/employee/employee.query';
import { useGetEmployeeByIdQuery } from '../components/portal.query';
import './certficate.css';

const Certificate1 = ({ licenseInfo, userInfo, ApplicationlicenseInfo }: any) => {
  const { data: issuedByInfo } = useGetEmployeeByIdQuery(ApplicationlicenseInfo?.license.issuedBy ?? "");
  const ValidFrom = new Date(ApplicationlicenseInfo?.license?.validFrom).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const ValidTo = new Date(ApplicationlicenseInfo?.license?.validTo).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="container">
      <div className="header">
        <div className="content">
          <div className="left-header">
            <img src="https://media.licdn.com/dms/image/D4E03AQG4jgEziXXBEg/profile-displayphoto-shrink_400_400/0/1677379760383?e=1691625600&v=beta&t=6Kzp_ovzQASomlB5_6q0Y7-EYRBZ45dhtbtkHK_OtBE" alt="User" className="user-image" />
            <div className="imagePosition">
              <img src={require("../assets/images/stamp.png")} alt="stamp" width="170" />
            </div>
          </div>
          <div className="center-header">
            <div className='center'>
              
              <img src={require("../assets/images/aah.png")} alt="logo" width="150" />

            </div>
            <div className="certificate-code">
              <p className='font-bold'>በአዲስ አበባ ከተማ አስተዳደር</p >
              <p>CITY ADMINSTRATION OF ADDIS ABABA</p>
              <p className='font-bold'>የምግብ የመድኃኒትና የጤና ክብካቤ አስተዳድርና ቁትትር ባለስልጣን </p >
              <p>FOOD MEDICINE AND HEALTH CARE ADMINSTRATION AND CONTROL AUTHORITY</p>
            </div>
          </div>
          <div className="right-header mr-0">
            <p>የምዝገባ ቁጥር SEPHO={ApplicationlicenseInfo?.license?.licenseNumber}</p>
            <p>IDNo:{ApplicationlicenseInfo?.license?.licenseNumber}</p>
            {/* <p>RPL=01</p> */}
          </div>

        </div>

        <div className="content">
          <div className="left-content">
            <p className='user-response'>የጤና ባለሞያዎች የሙያ ሥራ ፈቃድ የምስክር ወረቀት</p>
            <p>የአዲስ አበባ ከተማ አስተዳድር አስፈፃሚ ኦካላትን ለመወሰን ባወጣው አዋጅ ቁጥር 30/2004 እንቀፅ 8 ንዑስ አንቀፅ 12 ለአዲስ አበባ የምግብ የመድኃኒትና  የጤና ክብካቤ አስተዳዴርና ቁጥጥር ባለስልጣን በተሰጠ ሥልጣን መሠረት።</p>
            <br />
            <br />
            <p className='user-response'>{`${userInfo?.firstName} ${userInfo?.middleName} ${userInfo?.lastName}`}</p>
            <p>ተገቢውን መስፈርት አሟልተው ስለተፕ</p>
            <p className='user-response'>በ ሲኒየር ኢንቫይሮንሜንታል ሄልዝ ፕሮፌሽናል</p>
            <p >ሙያ መዝግቦ ይህንን ሥራ ፈቃድ የምስክር ወረቀት ሰጥትል </p>
            <br />
            <div className="center">
              <img src={require("../assets/images/signature1.png")} style={{ mixBlendMode: "multiply" }}  alt="Signature" width="150" />
            </div>
            <div className="alignLeft">
              <p>{`ይህ የሙያ ስራ ፈቃድ የሚያገለግለዉ ከ `} <u className='user-response'>{`${ValidFrom}`} </u> እስከ <u className='user-response'> {`${ValidTo}`} GC  </u> ነዉ</p>
              {/* <p> 29/16/2015  29/16/2018 ዓ.ም ብቻ</p> */}
              <p className='user-response'>ማሳሰቢያ</p>
              <p>ስምና ፎቶ ግራፍ ከተገለጸዉ ሰዉ በስተቀር ሴላ አካል ሲገለገልበት ኢይገባም በማንኛዉም ምከንያት ቢጠፋ ወዲያዉኑ የማሳወቅ ግዴታ አለብዎት በየሶስት ዓመቱ መታደስ አለበት።</p>
              {/* <p>1251115586465/4251118333562  15286</p> */}
            </div>

          </div>
          <div className="right-content">
            <p className='user-response'>HEALTH PROFESSIONALS LICENSING CERTIFICATE</p>
            <p>Food, Medicine & Health Care Administration, and Control Authority of Addi Ababa by Virtue of the power Vested on it by the Definitions of powers and Duties of Executive Organs of Addis Ababa city Administration Proclamation Number 30/2012 Article 8/12/</p>
            <p className='user-response'>{`${userInfo?.firstName} ${userInfo?.middleName} ${userInfo?.lastName}`}</p>
            <p>Having duty satisfied the requirements of the Authority here by Registered and licensed as,</p>

            <p className='user-response'>SENIOR ENVIRONMENTAL HEALTH PROFESSIONAL</p>
            <div className="center">
              <img src={require("../assets/images/signature1.png")} style={{ mixBlendMode: "multiply" }} alt="Signature" width="150" />
            </div>
            <div className="alignLeft">
              <p>{`This License is valid only from`} <u className='user-response'>{`${ValidFrom}`} </u> To <u className='user-response'> {`${ValidTo}`} GC </u></p>
              <p className='user-response'>N.B</p>
              <p>Unlawful if it is found being used by another person</p>
              <p>The holder is required to notify as soon as the certificate is lost or missed</p>
              <p>This Certificate shall Be renewed every three year</p>
              <p className='user-response'>Emaill proflisence@gmail.com</p>
              <p>ISSUED BY:       {`${issuedByInfo?.firstName} ${issuedByInfo?.middleName}`}
              </p>
              <div className="imagePosition2">
                <img src={require("../assets/images/stamp.png")} alt="stamp" width="170" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Certificate1;