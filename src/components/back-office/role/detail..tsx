import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoleForm from './role-form';
import { Breadcrumb, Button } from 'antd';
import CollapsibleCard from '../../../shared/card';
import { useGetRoleByRoleIdQuery } from './role.query';
import {PermissionAssignment} from './permission-assignment';
import { PlusCircleFilled } from '@ant-design/icons';

function DetailRole() {
  const {id}= useParams();
  const { data: role, isLoading: roleLoading } = useGetRoleByRoleIdQuery(id?.toString() ?? "");
  const [
    open,
    setOpen,
  ] = useState<boolean>(false);
  return (
    <><CollapsibleCard title={"Role Form"} loading={roleLoading}>
      <RoleForm mode={"update"} id={id}  data={role}  />

    </CollapsibleCard>
    <CollapsibleCard title={"Permission Assignment"} 
    subTitle="Assign permission to this role"
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
<PermissionAssignment tagAssignmentModalOpened={open} setTagAssignmentModalOpened={setOpen} tid={undefined}/>
      </CollapsibleCard></>

  );
}

export default DetailRole;
