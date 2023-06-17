import { Button } from "antd";
import React, { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Certificate2 from "../certificates/certificate2";
import Certificate3 from "../certificates/certificate3";

const GenerateCertificate3 = ({licenseInfo}:any) => {
  const certificateWrapper = useRef(null);
  const handleDownload = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
    });
  };

  return (
    <>
      <div className="App">
        <div className="Meta">
         {/*  <h1 className="font-hachi text-3xl">ACM Certificates</h1>
          <p>Please enter your name.</p>
          <input
            type="text"
            placeholder="Please enter your name..."
            value={name}
            onChange={handleNameChange}
            className="font-inherit p-2 w-full shadow-md border-2 border-gray-400 rounded-md"
          /> */}
          <Button
            onClick={handleDownload}
            type="primary"
            className="bg-white text-blue-500 font-semibold   rounded border border-blue-500
              hover:text-white"
          >
            Download
          </Button>
        </div>

        <div id="downloadWrapper" ref={certificateWrapper} className="p-4">
          {/*  */}

      <Certificate3/>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default GenerateCertificate3;
