import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PermissionForm from './permission-form';

function UpdatePermissionForm() {
  const [urlId] = useState(useParams);
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
       <Breadcrumb>
                  <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/Permission">Permission</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="">Update Permission</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
      <PermissionForm />
    </div>
  );
}

export default UpdatePermissionForm;
