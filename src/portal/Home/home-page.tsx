import { useNavigate } from "react-router-dom";
import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';
import { useGetLicenseByStatusQuery } from "../portal.query";
export default function HomePage(){
  const router=useNavigate();
  const {data:approvedLicense,isLoading:approvedLicenseLoading}=useGetLicenseByStatusQuery("APPROVED")
 const {data:draftLicese,isLoading:draftLicenseLoading}=useGetLicenseByStatusQuery("DRAFTED")
 const {data:submittedLicese,isLoading:submittedLicenseLoading}=useGetLicenseByStatusQuery("SUBMITED")
 const {data:REJECTEDLicese,isLoading:REJECTEDLicenseLoading}=useGetLicenseByStatusQuery("REJECTED")
 const {data:SUSPENDEDLicese,isLoading:SUSPENDEDLicenseLoading}=useGetLicenseByStatusQuery("SUSPENDED")
 const {data:ISSUEANCELicese,isLoading:ISSUEANCELicenseLoading}=useGetLicenseByStatusQuery("ISSUEANCE")
  return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
        <div >
            <CounterCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
            draftLicese={draftLicese} draftLicenseLoading={draftLicenseLoading} submittedLicese={submittedLicese} 
            submittedLicenseLoading={submittedLicenseLoading} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
              ISSUEANCELicese={ISSUEANCELicese} ISSUEANCELicenseLoading={ISSUEANCELicenseLoading}/>
        </div>
        <div style={{ display: 'flex' }} className="flex gap-4">
          <div style={{ flex: '8' }}>
            <TableCard />
          </div>
          <div style={{ flex: '2' }}>
            <ProgressChartCard approvedLicense={approvedLicense} approvedLicenseLoading={approvedLicenseLoading} 
            draftLicese={draftLicese} draftLicenseLoading={draftLicenseLoading} submittedLicese={submittedLicese} 
            submittedLicenseLoading={submittedLicenseLoading} REJECTEDLicenseLoading={REJECTEDLicenseLoading}
             REJECTEDLicese={REJECTEDLicese} SUSPENDEDLicese={SUSPENDEDLicese} SUSPENDEDLicenseLoading={SUSPENDEDLicenseLoading}
              ISSUEANCELicese={ISSUEANCELicese} ISSUEANCELicenseLoading={ISSUEANCELicenseLoading}/>
          </div>
        </div>
        </div>
    </>
  )
}