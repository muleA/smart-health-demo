import { Email, Phone } from '@mui/icons-material'
import './certificate2.css'

export default function Certificate5({ licenseInfo, ApplicationlicenseInfo, userInfo }: any) {
  console.log("license info at 4", licenseInfo)
  console.log("ApplicationlicenseInfo info at 4", ApplicationlicenseInfo)
  return (
    <div className="container">
      <div className="header">
        <div className="content">
          <div className="left-header ">
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
              <p>በአዲስ አበባ ከተማ አስተዳደር የምግብ፣የመድኃኒትና</p>
              <p>የጤና ክብካቤ አስተዳደርና ቁጥጥር ባለስልጣን </p>
              <p>Addis Ababa Food Medicine and Health Care Administration Authority </p>
              <p>የመድኃኒት ችርቻሮ ንግድ ድርጅት የብቃት ማረጋገጫ</p>
              <p>Competency Certificate for General Hospital</p>

            </div>
          </div>
          <div className="right-header border">
            <p> ቁጥር {ApplicationlicenseInfo?.license?.licenseNumber} </p>
            <p>ቀን {new Date(ApplicationlicenseInfo.license.updatedAt).toLocaleDateString('en-GB')}</p>
          </div>

        </div>

        <div >
          <div className="content">
            <p>የድርጅቱ ስምና ደረጃ</p>
            <p className='user-response'>{ApplicationlicenseInfo?.facilityName}</p>
          </div>
          <div className="content">
            <p>Name of Health Facility and Type of Service </p>
            <p className='user-response'>{ApplicationlicenseInfo?.facilityName}</p>
          </div>  <div className="content">
            <p>የድርጅቱ አድራሻ፤ መስተዳድር </p>
            <p className='user-response'>{licenseInfo?.city}</p>
            <p>ክ/ከተማ</p>
            <p className='user-response'>{licenseInfo?.subCity}</p>
            <p> ወረዳ</p>
            <p className='user-response'>{licenseInfo?.woreda}</p>
            <p> kebele</p>
            <p className='user-response'>{licenseInfo?.kebele}</p>
            <p>የቤት ቁጥር</p>
            <p className='user-response'>{licenseInfo?.houseNumber}</p>
            <p>የስልክ ቁጥር </p>
            <p className='user-response'>{licenseInfo?.phone}</p>
          </div>
          <div className="content">
            <p>state</p>
            <p className='user-response'> {licenseInfo?.state}</p>
            <p>City</p>
            <p className='user-response'>{licenseInfo?.city}</p>
            <p> Subcity</p>
            <p className='user-response'>{licenseInfo?.subCity}</p>
            <p>Woreda</p>
            <p className='user-response'>{licenseInfo?.woreda}</p>
            <p>kebele</p>
            <p className='user-response'>{licenseInfo?.kebele}</p>
            <p>House No</p>
            <p className='user-response'>{licenseInfo?.houseNumber}</p>
            <p>Tel .No </p>
            <p className='user-response'>{licenseInfo?.phone}</p>
          </div>
          <div className="content">
            <p>የድርጅቱ ባለንብረት ስም</p>
            <p className='user-response'>{ApplicationlicenseInfo?.applierType == 'owner' ? userInfo?.firstName + ' ' + userInfo?.middleName + ' ' + userInfo?.lastName : ApplicationlicenseInfo?.ownerName + ' ' + ApplicationlicenseInfo?.lastName}</p>
          </div>  <div className="content">
            <p>የየድርጅቱ ባለሙያ ስም</p>
            <p className='user-response'>{licenseInfo?.professionalName}</p>
            <p>የአያት ስም</p>
            <p className='user-response'>{licenseInfo?.professionalLastName} </p>
            <p>የስልክ ቁጥር</p>
            <p className='user-response'>{licenseInfo?.phone}</p>
          </div>  <div className="content">
            <p>የሙያ ደረጃ </p>
            <p className='user-response'>{licenseInfo?.qualificationLevel}</p>
          </div>  <div className="content">
            <p>የመያ ምዝገባ ቁጥር </p>
            <p className='user-response'>{licenseInfo?.professionalLicenseNumber}</p>
          </div>  <div className="content">
            <p>Facility Owner Name</p>
            <p className='user-response'>{ApplicationlicenseInfo?.applierType == 'owner' ? userInfo?.firstName + ' ' + userInfo?.middleName + ' ' + userInfo?.lastName : ApplicationlicenseInfo?.ownerName + ' ' + ApplicationlicenseInfo?.lastName}</p>
          </div>  <div className="content">
            <p>Technical Leader full Name</p>
            <p className='user-response'>{licenseInfo?.professionalName}</p>
            <p>Technical Leader Last Name</p>
            <p className='user-response'>{licenseInfo?.professionalLastName}</p>
            <p>Phone</p>
            <p className='user-response'>{licenseInfo?.phone}</p>
          </div>  <div className="content">
            <p>Qualification</p>
            <p className='user-response'>{licenseInfo?.qualificationLevel}</p>
            <p>Reg.no.</p>
            <p className='user-response'>{licenseInfo?.professionalLicenseNumber}</p>
          </div>
          <p>ድርጅቱ ተፈላጊውን ሙያዊ፤ ድርጅታዊና ሌሎች መስፈርቶችን ማሟላቱ ይህ የብቃት ማረጋገጫ ምስክር ወረቀት የምግብ፣የመድኃኒትና የጤና ክብካቤ አስተዳደርና ቁጥጥር አዋጅ 64/2011 ቁጥር ፤44መሠረት በባለሙያው/ዋ <b> ወ/ሪት ህይወት ምትኩ </b> ሰም ተሰጥቷል፡፡</p>
          <p>This Certificate is issued to the Health Facility in accordance with AAFMHACA Proclamation No. 64/2011
            article 44 after assuring the fulfillment of the required National Health Facility standard.

          </p>
<div className='grid'>
          <div >
            <div className="column" >
              <h2>ለ {parseInt(new Date(ApplicationlicenseInfo.license.updatedAt).toLocaleDateString('en-GB').split('/')[2])+1} ዓ.ም </h2>
              <p> በደረሰኝ ቁጥር-----------------</p>
              <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
              <p>ፊርማና ቀን--------------</p>
            </div>
            <div className="column" >
              <h2>ለ {parseInt(new Date(ApplicationlicenseInfo.license.updatedAt).toLocaleDateString('en-GB').split('/')[2])+2}  ዓ.ም</h2>
              <p> በደረሰኝ ቁጥር-----------------</p>
              <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
              <p>ፊርማና ቀን--------------</p>
            </div>
            <div className="column">
              <h2>ለ {parseInt(new Date(ApplicationlicenseInfo.license.updatedAt).toLocaleDateString('en-GB').split('/')[2])+3} ዓ.ም</h2>
              <p> በደረሰኝ ቁጥር-----------------</p>
              <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
              <p> ፊርማና ቀን--------------</p>
            </div>
          </div>
          <div>
            <ol>
              <p className='user-response'>ማስጠንቀቂያ፣</p>

              <li><p>የብቃት ማረጋገጫ ምስክር ወረቀት</p></li>
              <ul style={{ listStyleType: "square", paddingLeft: '40px' }}>


                <li><p>የሚሰጠው ወይም የማቷደሰው በተደረገው ቅድመ ወይም ድህረ ፈቃድ ኢንስፔክሽን ድርጅቱ ብቁ ሆኖ ሲገኝና የአገልግሎት ክፍያ ሲከፈል፡፡ በድርጅቱ ውስጥ ፊት ለፊት ሆኖ በሚታይ ስፍራ መኖር አለበት፡፡</p></li>
                <li className='user-response'><p>በየዓመቱ ከሐምሌ አስከ መስከረም ባለው የጊዜ ገደብ ውስጥ ካልታደሰ አንደተሰረዘ ይቆጠራል፡፡</p></li>
                <li><p>ባለሙያው ስራውን ሲለቅ ወይም ድርጅቱ ሲዘጋ መመለስና ድርጅቱም ወዲያው መዘጋት አለበት፡፡</p></li>
                <li><p>ድርጅቱ ስለጤና ተቋማት አገልግሎት አሰጣጥ የወጡትን ህጎች ፣ ደንቦችና መመሪያዎች የማይከተል ከሆነ ሊታገድ ወይም ሊሠረዝ ይችላል፡፡ </p></li>
              </ul>
              <li><p>ድርጅቱ ክፍት ሆኖ አገልግሎት መስጠት የሚችለው በስመ- የብቃት ማረጋገጫ ምስክር ወረቀት የተሰጠው ባለሙያ ባለበት ብቻ ነው፡፡</p></li>
              <li><p>የብቃት ማረጋገጫ ምስክር ወረቀት ሰጪው አካል ሣይፈቅድ በድርጅቱ ማንኛውንም ዓይነት ለውጥ ማድረግ የተከለከለ ነው፡:</p></li>
            </ol>
          </div>
          </div>
           
          <div className=" center">
            <Email className="mt-2" />
            <p>15286</p>
            <Phone className="mt-2" />
            <p>0118-12 75 98/0118-281013</p>
          </div>
        </div>
      </div>
        <div className="imagePosition3 center">
              <img src={require("../assets/images/stamp.png")} alt="stamp" width="170" />
            </div>
    </div>
  )
}