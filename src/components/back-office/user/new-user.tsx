import { Button, Card } from "antd"
import React from "react"
import UserForm from "./user-form"
import { useNavigate } from "react-router-dom"
import { PlusOutlined } from "@ant-design/icons"

export const NewUser=()=>{
    const navigate=useNavigate()
    return (<>
 <Card size="small" className="mt-4" title="Users" >
<UserForm mode={"new"}/>
</Card>    </>)
}