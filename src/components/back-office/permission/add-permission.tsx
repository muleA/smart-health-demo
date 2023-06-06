import React from 'react';
import { Breadcrumb } from 'antd';
import PermissionForm from './permission-form';

function AddPermission() {
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <Breadcrumb>
        <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/permission">Permission</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href="">New Permission</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <PermissionForm />
    </div>
  );
}

export default AddPermission;
