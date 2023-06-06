import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoleForm from './role-form';
import { Breadcrumb } from 'antd';

function UpdateRoleForm() {
  const [urlId] = useState(useParams);
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
       <Breadcrumb>
                  <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/role">Role</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="">Update Role</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
      <RoleForm />
    </div>
  );
}

export default UpdateRoleForm;
