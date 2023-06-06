import React from 'react';
import RoleForm from './role-form';
import { Breadcrumb } from 'antd';

function AddRole() {
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <Breadcrumb >
        <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/role">Role</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href="">New Role</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <RoleForm />
    </div>
  );
}

export default AddRole;
