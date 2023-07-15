import { Button, Card } from "antd";
import CustomTable from "../../../components/back-office/user/table";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Users } from "../../../components/back-office/user/user";
export  function User(){
const navigate=useNavigate();

return(<>

<Users/>

 </>)
}
