import { Card, Spin } from "antd";
import Chart from "./chart";
import SimplePieChart from "./pie-chart";
import {
  useGetApplicationsQuery,
  useGetUsersQuery,
} from "../back-office.query";
import { useGetLicenseByStatusQuery } from "../portal.query";
import { useGetEmployeesQuery } from "./employee/employee.query";
import {
  UserOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  CheckOutlined,
  CloseOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import React from "react";
import { useGetLicenseQuery } from "./license/license.query";
import { Diversity3, Person3Outlined } from "@mui/icons-material";
export function Dashboard() {
  const { data: users, isLoading } = useGetUsersQuery();
  const { data: licenses } = useGetLicenseQuery();

  const { data: approvedApplications, isLoading: approvedApplicationsLoading } =
    useGetLicenseByStatusQuery("APPROVED");
  const { data: submittedApplications, isLoading: submittedLicenseLoading } =
    useGetLicenseByStatusQuery("SUBMITED");
  const { data: rejectedAPplications, isLoading: REJECTEDLicenseLoading } =
    useGetLicenseByStatusQuery("REJECTED");
  const { data: employees, isLoading: employeeLoading } =
    useGetEmployeesQuery();
  const { data: applications, isLoading: applicationsLoading } =
    useGetApplicationsQuery();
  const data = [
    {
      icon: <Diversity3 style={{ fontSize: "36px" }} fontSize="large" />,
      label: "Total Users",
      value: users?.length ?? 0,
      className: "bg-blue-500 text-white",
    },
    {
      icon: <Diversity3 fontSize="large" style={{ fontSize: "36px" }} />,
      label: "Total Employees",
      value: employees?.length ?? 0,
      className: "bg-red-500 text-white",
    },
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: "36px" }} />,
      label: "Total Licenses",
      value: licenses?.length ?? 0,
      className: "bg-yellow-500 text-white",
    },
    {
      icon: <AppstoreOutlined style={{ fontSize: "36px" }} />,
      label: "Total Applications",
      value: applications?.length ?? 0,
      className: "bg-purple-500 text-white",
    },
    {
      icon: <CheckOutlined style={{ fontSize: "36px" }} />,
      label: "Approved Applications",
      value: approvedApplications?.length ?? 0,
      className: "bg-green-500 text-white",
    },
    {
      icon: <CloseOutlined style={{ fontSize: "36px" }} />,
      label: "Rejected Applications",
      value: rejectedAPplications?.length ?? 0,
      className: "bg-red-500 text-white",
    },
    {
      icon: <FileDoneOutlined style={{ fontSize: "36px" }} />,
      label: "Submitted Applications",
      value: submittedApplications?.length ?? 0,
      className: "bg-blue-500 text-white",
    },
  ];
  const data2= [
    { status: 'Applications', value: applications?.length },
    { status: 'Users', value: users?.length },
    { status: 'Employees', value: employees?.length },
    { status: 'Licenses', value: licenses?.length },
  ];

  return (
    <>
      {isLoading ||
      approvedApplicationsLoading ||
      submittedLicenseLoading ||
      REJECTEDLicenseLoading ||
      employeeLoading ? (
        <>
          <div className="text-center h-24 mx-auto">
            <Spin size="large" />
          </div>
        </>
      ) : (
        <>
          <div className="text-center  shadow-lg">
            <div className="grid grid-cols-1 gap-2  sm:grid-cols-7 sm:px-2">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${item.className} rounded-sm overflow-hidden shadow`}
                >
                  <div className="flex items-center">
                    <div className="rounded mr-4">
                      <p className="text-md">{item.value}</p>
                      <h3 className="text-sm">{item.label}</h3>
                    </div>
                    <div className="text-white">{item.icon}</div>
                  </div>
                </div>
              ))}
            </div>
            </div>

            <div className="text-center shadow-lg">
            <div className=" mt-2 flex mx-auto  p-4">
              <Chart data={data2} />
              <SimplePieChart
                submitted={submittedApplications?.length}
                approved={approvedApplications?.length}
                rejected={rejectedAPplications?.length}
                total={applications?.length}
              />
            </div>
            </div>
            
        </>
      )}
    </>
  );
}
