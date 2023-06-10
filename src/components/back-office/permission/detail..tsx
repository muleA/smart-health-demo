import React from 'react';
import { useParams } from 'react-router-dom';
import PermissionForm from './permissions-form';
import CollapsibleCard from '../../../shared/card';
import { useGetPermissionByIdQuery } from './permission.query';

function DetailPermissions() {
  const {id}= useParams();
  const { data: permissions, isLoading: permissionLoading } = useGetPermissionByIdQuery(id?.toString() ?? "");

  return (
    <CollapsibleCard title={"Permission Form"} loading={permissionLoading}>
      <PermissionForm mode={"update"} id={id} data={permissions}/>

    </CollapsibleCard>
   
  );
}

export default DetailPermissions;
