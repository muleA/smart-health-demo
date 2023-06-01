import { Card, Button } from "antd";
import CustomTable from "./application-list";
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

export default function MyApplicationList(){
  const router=useRouter();
  return(
    <>
     <Card size="small" className="mt-4" title="Users" extra={<Button onClick={()=>router.push("/new-application")} type="primary"
  icon={<PlusOutlined style={{display:"inline-block",verticalAlign:"middle",marginRight:"4px",padding:'2px'}} size={24} />} 
 className="bg-primary-600" >New</Button>
} >
<CustomTable/>
</Card>
    </>
  )
}