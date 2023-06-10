import React from 'react';
import { Breadcrumb } from 'antd';
import LicenseForm from './license-form';

function AddLicense() {
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <Breadcrumb>
        <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/license">License</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href="">New License</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LicenseForm />
    </div>
  );
}

export default AddLicense;
