import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./user-form";
import React from "react";
import CollapsibleCard from "../../../shared/card";
import { UserApplicationsDetail } from "./user-application-detail";
export  function UserDetail(){
const navigate=useNavigate();
const {id}=useParams()
return(<>
<CollapsibleCard title={"User Information's"}>
<UserForm mode={"update"} id={id?.toString()} />

</CollapsibleCard>

<CollapsibleCard title={"Applications"}>
<UserApplicationsDetail id={id}/>
</CollapsibleCard>







    </>)
}