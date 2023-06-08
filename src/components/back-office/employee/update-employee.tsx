import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import EmployeeForm from './employee-form';

function UpdatedEmployeeForm() {
  const [urlId] = useState(useParams);
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
       <Breadcrumb>
                  <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/employee">Employee</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="">Update Employee</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
      <EmployeeForm />
    </div>
  );
}

export default UpdatedEmployeeForm;
