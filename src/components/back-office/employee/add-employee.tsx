import React from 'react';
import { Breadcrumb } from 'antd';
import EmployeeForm from './employee-form';

function AddEmployee() {
  return (
    <div className="m-4 bg-white p-4 rounded-l shadow-lg ">
      <Breadcrumb>
        <Breadcrumb.Item>Back-Office</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/employee">Employee</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href="">New Employee</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default AddEmployee;
