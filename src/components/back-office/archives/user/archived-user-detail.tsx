import { Button, Card } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import ArchivedUserForm from "./archived-user-form";
import React from "react";
import CollapsibleCard from "../../../../shared/card";


export  function ArchivedUserDetail(){
const navigate=useNavigate();
const {id}=useParams()
return(<>
<CollapsibleCard title={"Archived User Information's"}>
<ArchivedUserForm mode={"update"} id={id} />

</CollapsibleCard>



    </>)
}