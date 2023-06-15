import React from 'react';
import PermissionForm from './permissions-form';
import CollapsibleCard from '../../../shared/card';

function NewPermission() {
  return (
    <CollapsibleCard title={"Permission Information's"} dropped={true}>
    <PermissionForm mode={"new"}/>
    
    </CollapsibleCard>
  );
}

export default NewPermission;
