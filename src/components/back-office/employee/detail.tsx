import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./employee-form";
import React, { useState } from "react";
import CollapsibleCard from "../../../shared/card";
import { RoleAssignment } from "./role-asssignment";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import IsPermitted from "../../../shared/auth/is-permitted";
import { AssignRole } from "../../../shared/shell/permissions-list";
export  function EmployeeDetails(){
const navigate=useNavigate();
const {id}=useParams()
const [
    open,
    setOpen,
  ] = useState<boolean>(false);
return(<>
<CollapsibleCard title={"Employee Information's"}>
<UserForm mode={"update"} id={id} />

</CollapsibleCard>
 <IsPermitted requiredPermissions={AssignRole}>
 <CollapsibleCard title={"Role Assignment"} 
    subTitle="Assign Role to this role"
    customAction={
      <Button
        type="primary"
        className="ml-2 bg-primary"
        onClick={() => setOpen(true)}
      >
        <PlusCircleFilled />
        Assign
      </Button>
    }
    >
<RoleAssignment tagAssignmentModalOpened={open} setTagAssignmentModalOpened={setOpen} tid={undefined}/>
      </CollapsibleCard>
       </IsPermitted>
 
      </>

    
)}
