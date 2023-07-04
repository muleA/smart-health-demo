import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';
import { useGetApplicationUserIdQuery, useGetLicenseByUserIdAndStatusQuery, useGetLicenseByUserIdQuery } from "../../portal.query";
import { useAuth } from "../../../shared/auth/use-auth";
import { AppstoreOutlined, CheckOutlined, CloseOutlined, FileDoneOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Card } from "antd";
export default function HomePage(){
  const {session}=useAuth()
  const {data:totalLicense,isLoading:totalLicenseLoading}=useGetLicenseByUserIdQuery(session?.userInfo?.userId)
  const {data:applications,isLoading}=useGetApplicationUserIdQuery(session?.userInfo?.userId)

  const {data:approvedLicense,isLoading:approvedLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"ACTIVE"})
 const {data:REJECTEDLicese,isLoading:REJECTEDLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"EXPIRED"})
 const {data:SUSPENDEDLicese,isLoading:SUSPENDEDLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"SUSPENDED"})
 const data = [
  {
    icon: <AppstoreOutlined style={{ fontSize: "36px" }} />,
    label: "Total Applications",
    value: applications?.length ?? 0,
    className: "bg-purple-500 text-white",
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: "36px" }} />,
    label: "Total Licenses",
    value: totalLicense?.length ?? 0,
    className: "bg-blue-500 text-white",
  },

  {
    icon: <CheckOutlined style={{ fontSize: "36px" }} />,
    label: "Active Licenses",
    value: approvedLicense?.length ?? 0,
    className: "bg-green-500 text-white",
  },
  {
    icon: <CloseOutlined style={{ fontSize: "36px" }} />,
    label: "Expired Licenses",
    value: REJECTEDLicese?.length ?? 0,
    className: "bg-yellow-500 text-white",
  },
  {
    icon: <FileDoneOutlined style={{ fontSize: "36px" }} />,
    label: "Suspended Applications",
    value: SUSPENDEDLicese?.length ?? 0,
    className: "bg-red-500 text-white",
  },
];
 
 return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
       {/*  <div >
            <CounterCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
            submittedLicenseLoading={totalLicenseLoading} submittedLicese={totalLicense?.length} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
              />
        </div> */}
         <Card className="text-center  shadow-lg">
            <div className="grid grid-cols-1 gap-2  sm:grid-cols-5 sm:px-2">
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
            </Card>
        <div style={{ display: 'flex' }} className="flex gap-4">
          <div style={{ flex: '8' }}>
            <TableCard />
          </div>
          <div style={{ flex: '2' }}>
            <ProgressChartCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
           submittedLicese={totalLicense?.length} 
            submittedLicenseLoading={totalLicenseLoading} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
            />
          </div>
        </div>
        </div>
    </>
  )
}