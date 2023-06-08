import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import ApplicationForm from './application-form';

function UpdatedApplicationForm() {
  const [urlId] = useState(useParams);
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
       <Breadcrumb>
                  <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/license">Application</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="">Update Application</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
      <ApplicationForm />
    </div>
  );
}

export default UpdatedApplicationForm;
