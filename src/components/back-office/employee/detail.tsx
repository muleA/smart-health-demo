import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./employee-form";
import React, { useState } from "react";
import CollapsibleCard from "../../../shared/card";
import { RoleAssignment } from "./role-asssignment";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import IsPermitted from "../../../shared/auth/is-permitted";
import { AssignRole } from "../../../shared/shell/permissions-list";
import UpdateEmployeeForm from "./update-employee-form";
export  function EmployeeDetails(){
const navigate=useNavigate();
const {id}=useParams()
const [
    open,
    setOpen,
  ] = useState<boolean>(false);
return(<>
<CollapsibleCard title={"Employee Information's"}>
<UpdateEmployeeForm id={id}/>

</CollapsibleCard>
 <IsPermitted requiredPermissions={AssignRole}>
 <CollapsibleCard title={"Role Assignment"} 
    subTitle="Assign Role"
    customAction={
      <Button
        type="primary"
        className="ml-2 bg-primary items-center flex justify-center"
        onClick={() => setOpen(true)}
      >
        <PlusCircleFilled className="mx-auto mt-0"/>
        Assign
      </Button>
    }
    >
<RoleAssignment tagAssignmentModalOpened={open} setTagAssignmentModalOpened={setOpen} tid={undefined}/>
      </CollapsibleCard>
       </IsPermitted>
 
      </>

    
)}
