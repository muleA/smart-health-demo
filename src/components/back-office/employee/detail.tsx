import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./employee-form";
import React from "react";
import CollapsibleCard from "../../../shared/card";
export  function EmployeeDetails(){
const navigate=useNavigate();
const {id}=useParams()
return(<>
<CollapsibleCard title={"User Information's"}>
<UserForm mode={"update"} id={id} />

</CollapsibleCard>
<CollapsibleCard title={"Role Assignment"}>
     role assignment
</CollapsibleCard>
    </>)
}