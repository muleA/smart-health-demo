import React, { useState } from "react";
import { Table } from "antd";
import { useGetUsersQuery } from "./portal.query";
import { RightOutlined } from "@ant-design/icons";

interface User {
  id: string;
  Column1: string;
  LastName: string;
  phone: string;
  Email: string;
}

export const AccountSettings = (): JSX.Element => {
  return <>Account settings</>;
};

export default AccountSettings;
