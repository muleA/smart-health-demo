import React from 'react';
import { Breadcrumb } from 'antd';
import LicenseForm from './application-form';
import ApplicationForm from './application-form';

function AddApplication() {
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <Breadcrumb>
        <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/application">Application</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href="">New Application</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <ApplicationForm />
    </div>
  );
}

export default AddApplication;
