import React from "react";
import { Card, Modal, Typography } from "antd";
import { UserOutlined, CrownOutlined, CheckCircleOutlined } from "@ant-design/icons";

const Certificate = (props:{handleModalClose: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,modalVisible: boolean | undefined}) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["Certificate content"], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "certificate.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Modal
    visible={props.modalVisible}
    width={1000}
    title="Certificate"
    onCancel={props.handleModalClose}
    footer={[
      <button key="download" className="bg-white text-blue-500 font-semibold py-2 px-4 rounded border border-blue-500 hover:bg-blue-500 hover:text-white" onClick={handleDownload}>
        Download Certificate
      </button>,
      <button key="close" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
       onClick={props?.handleModalClose}>
        Close
      </button>,
    ]}
  >

    <Card className="w-full mx-auto p-6 bg-gradient-to-b from-blue-300 to-blue-500 text-white">
      <div className="flex justify-between items-center">
        <div>
          <Typography.Title level={3} className="mb-2">
            Certificate of Achievement
          </Typography.Title>
          <div className="flex items-center mb-4">
            <CrownOutlined className="text-2xl mr-2" />
            <Typography.Text strong>Governing Body</Typography.Text>
          </div>
        </div>
        <div>
          <img src="https://media.licdn.com/dms/image/D4E03AQG4jgEziXXBEg/profile-displayphoto-shrink_800_800/0/1677379760383?e=1691625600&v=beta&t=WbMVY4u6FHJvGzCXa_dQ4CGljGG7sBNjkrB9sglZibE" alt="Certificate Holder" className="w-20 h-20 rounded-full" />
          <img src="https://data.landportal.info/sites/landportal.org/files/styles/220heightmax/public/Addis_Ababa_University_logo.png?itok=-A0y6b-5" alt="Governing Body Logo" className="w-12 h-12 mt-4" />
        </div>
      </div>
      <div className="text-center">
        <Typography.Text className="text-2xl">
          This is to certify that
        </Typography.Text>
        <Typography.Title level={2} className="mb-4">
          Mulugeta Adamu
        </Typography.Title>
        <Typography.Text className="text-2xl">
          has successfully completed the required course of study and is hereby awarded this certificate.
        </Typography.Text>
      </div>
      <div className="flex justify-center mt-8">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU4D6pRPt4yIbojY-RnjVtuOu4SKl5bu97jYVC5y3miu_5B4qcrMwWRE_LXxrYl9znXCs&usqp=CAU" alt="Certificate Seal" className="w-24 h-24" />
      </div>
      <div className="flex justify-between mt-8">
        <Typography.Text><img src="data:image/png;base64,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"/> Authorized Signature</Typography.Text>
        <Typography.Text>Authorized Signature</Typography.Text>
      </div>
  {/*     <div className="text-center mt-8">
        <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded border border-blue-500 hover:bg-blue-500 hover:text-white" onClick={handleDownload}>
          Download Certificate
        </button>
      </div> */}
    </Card>
    </Modal>
  );
};

export default Certificate;
