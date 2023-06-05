import { Button, Card } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./user-form";
import React from "react";
export  function UserDetail(){
const navigate=useNavigate();
const {id}=useParams()
return(<>
 <Card size="small" className="mt-4" title="Users"  >
<UserForm mode={"update"} id={id} />
</Card>


    </>)
}