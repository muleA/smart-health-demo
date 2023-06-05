import { Button, Card } from "antd";
import CustomTable from "./table";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import React from "react";
export  function User(){
const navigate=useNavigate();

return(<>
 <Card size="small"       
 className="mt-4 " title="Customer List" extra={<Button onClick={()=>navigate("/new-user")} type="primary"
  icon={<PlusOutlined style={{display:"inline-block",verticalAlign:"middle",marginRight:"4px",padding:'2px'}} size={24} />} 
 className="bg-primary-600 h-64">New</Button>
} >
<CustomTable/>
</Card>


    </>)
}