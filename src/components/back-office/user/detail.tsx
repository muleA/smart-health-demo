import { Button, Card } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./user-form";
import React from "react";
import CollapsibleCard from "../../../shared/card";
export  function UserDetail(){
const navigate=useNavigate();
const {id}=useParams()
return(<>
<CollapsibleCard title={"User Information's"}>
<UserForm mode={"update"} id={id} />

</CollapsibleCard>


<CollapsibleCard title={"Education Information's"}>
     education
</CollapsibleCard>
<CollapsibleCard title={"Experience"}>

    experiences list
</CollapsibleCard>

<CollapsibleCard title={"Certificates"}>

     Certificates
</CollapsibleCard>


<CollapsibleCard title={"Applications"}>
     Applications
</CollapsibleCard>
<CollapsibleCard title={"License"}>

     licenses
</CollapsibleCard>






    </>)
}