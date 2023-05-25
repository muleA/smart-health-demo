import { Card } from "antd";
import LicenseForm from "../components/user/application-form";

export default function NewApplication(){
    return(<>
<Card  title="New Application">
    <LicenseForm/>
    </Card>    
    </>)
}