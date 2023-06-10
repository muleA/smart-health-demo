import {Card } from "antd"
import React from "react"
import EmployeeForm from "./employee-form"
export const NewEmployee=()=>{
    return (<>
 <Card size="small" className="mt-4" title="Users" >
<EmployeeForm mode={"new"}/>
</Card>    </>)
}