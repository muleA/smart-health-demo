import { RedEnvelopeTwoTone } from '@ant-design/icons';
import './certificate2.css';
import { Email, Phone } from '@mui/icons-material';

export default function Certificate2({licenseInfo}:any)  {
return(
  <div className="container">
  <div className="header">
        <div className="content">
            <div className="left-header ">
               <img src="https://media.licdn.com/dms/image/D4E03AQG4jgEziXXBEg/profile-displayphoto-shrink_400_400/0/1677379760383?e=1691625600&v=beta&t=6Kzp_ovzQASomlB5_6q0Y7-EYRBZ45dhtbtkHK_OtBE" alt="User" className="user-image"/>
               <div className="imagePosition">
              <img src={require("../assets/images/stamp.png")} alt="stamp" width="170" />
            </div></div>
            <div className="center-header">
            <div className='center'>
               <img src={require("../assets/images/aah.png")} alt="logo" width="150" />
                </div>    
                <div className="certificate-code">
                <p>በአዲስ አበባ ከተማ አስተዳደር የምግብ፣የመድኃኒትና</p>
              <p style={{margin:" 0 45px"}}>የጤና ክብካቤ አስተዳደርና ቁጥጥር ባለስልጣን </p>
              <p>የቴሌሄልዝ ሴንተር የብቃት ማረጋገጫ</p>
              </div>
              </div>
              <div className="right-header border">
                <p> ቁጥር ጤ/ተ/ባ </p>
                <p>ቅን 16/05/2015 ዓ.ም</p>
              </div>
            
          </div>
  <div >
      <div className="content">
          <p>የድርጅቱ ስምና ደረጃ</p>
          <p className='user-response'>አቢሲኒያ መድኃኒት ቤት ቁጥር.5</p>
      </div><div className="content">
          <p>የድርጅቱ አድራሻ፤ መስተዳድር </p>
          <p className='user-response'>አ/አ</p>
          <p>ክ/ከተማ</p>
          <p className='user-response'>ን/ስ/ሳ</p>
          <p> ወረዳ</p>
          <p className='user-response'>06</p>
          <p>የቤት ቁጥር</p>
          <p className='user-response'>3495</p>
          <p>የስልክ ቁጥር </p>
          <p className='user-response'>090930097848</p>
      </div>  
      <div className="content">
          <p>የድርጅቱ ባለንብረት ስም</p>
          <p className='user-response'>አቶ ሳምሶን አሰፋ</p>
      </div>  <div className="content">
          <p>የየድርጅቱ ባለሙያ ስም</p>
          <p className='user-response'>ወ/ሪች ህይወት ምትኩ</p>
          <p>የአያት ስም</p>
          <p className='user-response'>አኑሎ </p>
          <p>የስልክ ቁጥር</p>
          <p className='user-response'>093767306/0930097848</p>
      </div>  <div className="content">
          <p>የሙያ ደረጃ </p>
          <p className='user-response'>ጁኒየር ፋርማሲስት</p>
      </div>  <div className="content">
          <p>የመያ ምዝገባ ቁጥር </p>
          <p className='user-response'>JP=1906/2011</p>
      </div>   
          <p>ድርጅቱ ተፈላጊውን ሙያዊ፤ ድርጅታዊና ሌሎች መስፈርቶችን ማሟላቱ ይህ የብቃት ማረጋገጫ ምስክር ወረቀት የምግብ፣የመድኃኒትና የጤና ክብካቤ አስተዳደርና ቁጥጥር አዋጅ 64/2011 ቁጥር ፤44መሠረት በባለሙያው/ዋ <b> ወ/ሪት ህይወት ምትኩ </b> ሰም ተሰጥቷል፡፡</p>
          <div className='grid'>
         <div >
                  <div className="column" >
                    <h2>ለ 2015 ዓ.ም </h2>
                    <p> በደረሰኝ ቁጥር-----------------</p>
                    <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
                    <p>ፊርማና ቀን--------------</p>
                  </div>
                  <div className="column" >
                    <h2>ለ 2016 ዓ.ም</h2>
                    <p> በደረሰኝ ቁጥር-----------------</p>
                    <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
                    <p>ፊርማና ቀን--------------</p>
                  </div>
                  <div className="column">
                    <h2>ለ 2017 ዓ.ም</h2>
                    <p> በደረሰኝ ቁጥር-----------------</p>
                    <p>የአገልግሎት ክፍያ ተከፍሎ ታድሷል፡፡</p>
                    <p> ፊርማና ቀን--------------</p>
                  </div>
                </div>
                <div>
              <p className='user-response'>ማስጠንቀቂያ፣</p>
              <ol>
                  <li><p>የብቃት ማረጋገጫ ምስክር ወረቀት</p></li>
                  <ul style={{listStyleType:"square", paddingLeft:'40px'}}>
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
                  <Email className="mt-2"/>
                  <p>15286</p>
                  <Phone className="mt-2"/>
                  <p>0118-12 75 98/0118-281013</p>
              </div>
  </div>  
  </div>
  <div className="imagePosition3 center">
              <img src={require("../assets/images/stamp.png")} alt="stamp" width="170" />
            </div>
</div>
);};