import { Card } from "antd"
import { AboutSvg } from "./about-svg"

export const AboutUs=()=>{
 return(<>
 
 <Card className="w-3/2">
 <div className="flex flex-col md:flex-row items-center justify-center">
  <div className="md:w-1/2">
<AboutSvg/>
  </div>
  <div className="md:w-1/2 md:ml-8">
 <h2 className="text-xl font-semibold mb-4 text-primary">Welcome to Smart Health  eLicense  System!</h2>
 <p className="text-base mb-8">
At Smart Health, we are dedicated to revolutionizing the way professional licenses are managed in the healthcare industry. Our advanced electronic license management system provides a comprehensive platform designed to streamline and simplify the licensing process for healthcare providers, administrators, and licensing authorities.
 </p>
 <p className="text-base mb-8">
With our system, you can say goodbye to manual paperwork, complex spreadsheets, and inefficient processes. We offer a range of powerful tools and features that enable you to efficiently handle license applications, renewals, verifications, and more, all in one centralized platform.
 </p>
 <h3 className="text-xl font-semibold mb-4 text-primary">Why Choose Smart Health Electronic License Management System:</h3>
 <ul className="list-disc list-inside">
<li className="text-base mb-4">
  Streamlined Process: Our system eliminates the need for manual paperwork and simplifies the entire license management process. With just a few clicks, you can submit applications, track progress, and receive notifications, saving you valuable time and effort.
</li>
<li className="text-base mb-4">
  Enhanced Efficiency: Say goodbye to time-consuming manual data entry and repetitive tasks. Our system automates various aspects of the license management process, allowing you to focus on more critical tasks and improve overall efficiency.
</li>
<li className="text-base mb-4">
  Comprehensive Dashboard: Gain a comprehensive view of your license management activities through our intuitive dashboard. Monitor license statuses, track application progress, access important documents, and generate insightful reports effortlessly.
</li>
  
 </ul>
  
  </div>
</div>

 </Card> 


 
 </>)
}