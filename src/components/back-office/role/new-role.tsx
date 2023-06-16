import React from 'react';
import RoleForm from './role-form';
import CollapsibleCard from '../../../shared/card';

function NewRole() {
  return (
    <CollapsibleCard title={"Role Form"} dropped ={true} >
    <RoleForm mode={"new"}/>
    
    </CollapsibleCard>
  );
}

export default NewRole;
