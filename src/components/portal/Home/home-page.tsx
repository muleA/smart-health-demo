import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';
import { useGetLicenseByStatusQuery } from "../../portal.query";
export default function HomePage(){
  const {data:approvedLicense,isLoading:approvedLicenseLoading}=useGetLicenseByStatusQuery("APPROVED")
 const {data:submittedLicese,isLoading:submittedLicenseLoading}=useGetLicenseByStatusQuery("SUBMITED")
 const {data:REJECTEDLicese,isLoading:REJECTEDLicenseLoading}=useGetLicenseByStatusQuery("REJECTED")
 const {data:SUSPENDEDLicese,isLoading:SUSPENDEDLicenseLoading}=useGetLicenseByStatusQuery("SUSPENDED")
  return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
        <div >
            <CounterCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
            submittedLicenseLoading={submittedLicenseLoading} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
              />
        </div>
        <div style={{ display: 'flex' }} className="flex gap-4">
          <div style={{ flex: '8' }}>
            <TableCard />
          </div>
          <div style={{ flex: '2' }}>
            <ProgressChartCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
           submittedLicese={submittedLicese} 
            submittedLicenseLoading={submittedLicenseLoading} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
            />
          </div>
        </div>
        </div>
    </>
  )
}