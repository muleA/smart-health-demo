import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';
import { useGetLicenseByUserIdAndStatusQuery, useGetLicenseByUserIdQuery } from "../../portal.query";
import { useAuth } from "../../../shared/auth/use-auth";
export default function HomePage(){
  const {session}=useAuth()
  const {data:totalLicense,isLoading:totalLicenseLoading}=useGetLicenseByUserIdQuery(session?.userInfo?.userId)

  const {data:approvedLicense,isLoading:approvedLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"ACTIVE"})
 const {data:REJECTEDLicese,isLoading:REJECTEDLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"EXPIRED"})
 const {data:SUSPENDEDLicese,isLoading:SUSPENDEDLicenseLoading}=useGetLicenseByUserIdAndStatusQuery({userId:session?.userInfo?.userId,status:"SUSPENDED"})
  return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
        <div >
            <CounterCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
            submittedLicenseLoading={totalLicenseLoading} submittedLicese={totalLicense?.length} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
              />
        </div>
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