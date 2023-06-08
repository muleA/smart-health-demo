import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import LicenseForm from './license-form';

function UpdatedLicenseForm() {
  const [urlId] = useState(useParams);
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
       <Breadcrumb>
                  <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/license">License</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="">Update License</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
      <LicenseForm />
    </div>
  );
}

export default UpdatedLicenseForm;
