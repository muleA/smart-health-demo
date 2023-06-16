import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import CollapsibleCard from "../../../../shared/card";
import ArchivedEmployeeForm from "./archived-employee-form";

export function ArchivedEmployeeDetails(){

const navigate=useNavigate();
const {id}=useParams()
return(<>
<CollapsibleCard title={"Archived Information's"}>
<ArchivedEmployeeForm mode={"update"} id={id} />

</CollapsibleCard>
    </>)
}