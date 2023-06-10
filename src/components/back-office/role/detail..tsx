import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoleForm from './role-form';
import { Breadcrumb } from 'antd';
import CollapsibleCard from '../../../shared/card';
import { useGetRoleByRoleIdQuery } from './role.query';

function DetailRole() {
  const {id}= useParams();
  const { data: role, isLoading: roleLoading } = useGetRoleByRoleIdQuery(id?.toString() ?? "");

  return (
    <><CollapsibleCard title={"Role Form"} loading={roleLoading}>
      <RoleForm mode={"update"} id={id}  data={role}  />

    </CollapsibleCard>
    <CollapsibleCard title={"Permission Assignment"}>
        assign permission
      </CollapsibleCard></>
  );
}

export default DetailRole;
