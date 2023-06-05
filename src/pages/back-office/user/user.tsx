import { Button, Card } from "antd";
import CustomTable from "../../../components/back-office/user/table";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import React from "react";
export  function User(){
const navigate=useNavigate();

return(<>
 <Card size="small" className="mt-4" title="Users" extra={<Button onClick={()=>navigate("/user/new-user")} type="primary"
  icon={<PlusOutlined style={{display:"inline-block",verticalAlign:"middle",marginRight:"4px",padding:'2px'}} size={24} />} 
 className="bg-primary-600" >New</Button>
} >
<CustomTable/>
</Card>


    </>)
}