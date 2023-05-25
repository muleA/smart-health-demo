import EducationInformation from "./education-information";
import ExperienceInformations from "./experience-information";
import PersonalInformation from "./personal-informations";
import Certifications from "./certifications";

export default function ProfileWrapper(){
    return(<>
    <PersonalInformation/>
    <EducationInformation/>
    <ExperienceInformations/>
    <Certifications/>
    </>)
}