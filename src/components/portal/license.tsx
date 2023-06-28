import React, { useRef } from "react";
import { Button, Modal } from "antd";
import { exportComponentAsPNG } from "react-component-export-image";
// import Certificate1 from "../../certificates/health-proffessional";
import GenerateCertificate3 from "../../shared/generate-certificate3";
import GenerateCertificate4 from "../../shared/generate-certificate4";
import GenerateCertificate5 from "../../shared/generate-certificate5";
import { useGetUserByIdQuery } from "../portal.query";
import Certificate1 from "../../certificates/health-proffessional";

const CertificateLicense = (props: { licenseInfo: any, ApplicationlicenseInfo: any, handleModalClose: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined, modalVisible: boolean | undefined }) => {
  //  console.log("license info test",props?.licenseInfo)
  console.log("ApplicationlicenseInfo info test", props?.ApplicationlicenseInfo)

  const { data: userInfo, isLoading } = useGetUserByIdQuery(props?.licenseInfo?.userId)
  

   console.log("userInfoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",userInfo)
  const certificateWrapper = useRef(null);
  const handleDownload = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
    });
  };

  const exportButton = document.getElementById('exportButton');
  exportButton?.addEventListener('click', () => {
    // Perform the export process
    window.print();

  });

  return (
    <Modal
      visible={props.modalVisible}
      width={1000}
      title="My License"
      onCancel={props.handleModalClose}
      footer={null}
    >

      <div className="App">
        <div className="Meta flex space-x-2">
          <Button
            onClick={handleDownload}
            className="bg-white text-blue-500 font-semibold   rounded border border-blue-500
              hover:text-white"
          >
            Download
          </Button>
          <div>
            <Button id="exportButton" className="text-blue-500 rounded border border-blue-500 " onClick={()=>window.print()}>Print</Button>

          </div>
        </div>



        <div id="downloadWrapper" ref={certificateWrapper} className="p-4">


          {
            props?.licenseInfo?.applicationCategory === 'CompetencyCertificateforGeneralHospital' && <GenerateCertificate5 licenseInfo={props?.licenseInfo} ApplicationlicenseInfo={props?.ApplicationlicenseInfo} />

          }
          {
            props?.licenseInfo?.applicationCategory === 'CompetencyCertificateforSpecialtyCenter' && <GenerateCertificate4 licenseInfo={props?.licenseInfo} ApplicationlicenseInfo={props?.ApplicationlicenseInfo} />

          }
          {
            props?.licenseInfo?.applicationCategory === 'CompetencyCertificateforRetailPharmacy' && <GenerateCertificate3 licenseInfo={props?.licenseInfo} ApplicationlicenseInfo={props?.ApplicationlicenseInfo} />

          }
          {
            // eslint-disable-next-line no-mixed-operators
            props?.licenseInfo?.applicationCategory === 'HealthProfessional'
            && <Certificate1 licenseInfo={props?.licenseInfo} userInfo={userInfo} ApplicationlicenseInfo={props?.ApplicationlicenseInfo}/>

          }

        </div>
      </div>
    </Modal>
  );
};

export default CertificateLicense;
