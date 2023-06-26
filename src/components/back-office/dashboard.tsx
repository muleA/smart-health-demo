import { Card, Spin } from "antd";
import Chart from "./chart";
import SimplePieChart from "./pie-chart";
import {  useGetApplicationsQuery, useGetUsersQuery } from "../back-office.query";
import { useGetLicenseByStatusQuery } from "../portal.query";
import { useGetEmployeesQuery } from "./employee/employee.query";
export function Dashboard() {
 
  const { data: users, isLoading } = useGetUsersQuery();
  const {data:approvedLicense,isLoading:approvedLicenseLoading}=useGetLicenseByStatusQuery("APPROVED")
 const {data:submittedLicese,isLoading:submittedLicenseLoading}=useGetLicenseByStatusQuery("SUBMITED")
 const {data:REJECTEDLicese,isLoading:REJECTEDLicenseLoading}=useGetLicenseByStatusQuery("REJECTED")
const {data:employees,isLoading:employeeLoading}=useGetEmployeesQuery()
const {data:applications,isLoading:applicationsLoading}=useGetApplicationsQuery()

  return (
    <>
     {isLoading||approvedLicenseLoading|| submittedLicenseLoading||REJECTEDLicenseLoading||employeeLoading? (
        <>
                <div className="text-center h-24 mx-auto">

          <Spin size="large" />
          </div>
        </>
      ) : (
        <>
          <Card className="text-center mx-auto">
            <div className="grid grid-cols-1 gap-4 px-4  sm:grid-cols-4 sm:px-8">
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">
                    Total Users
                  </h3>
                  <p className="text-3xl">{users?.length}</p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-orange-400">
                  <div className="h-12 w-12 text-white">
                    <img src={""} alt="" />
                  </div>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Approved Applications</h3>
                  <p className="text-3xl">
                    {approvedLicense?.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-blue-400">
                  <div className="h-12 w-12text-white">
                    <img src={""} alt="" />
                  </div>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Submitted Applications</h3>
                  <p className="text-3xl">{submittedLicese?.length}</p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-indigo-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Rejected Applications</h3>
                  <p className="text-3xl">{REJECTEDLicese?.length}</p>
                </div>
              </div>
            </div>
            <div className=" mt-2 flex mx-auto p-4 bg-gay-50">
            <Chart data={applications} />
            <SimplePieChart totalRestaurant={approvedLicense?.length} 
            totalUser={users?.length} totalDriver={employees?.length} totalOrder={submittedLicese?.length} />
          </div>
          </Card>

     
        </>
      )}
    </>
  );
}
