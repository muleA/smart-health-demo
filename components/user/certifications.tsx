import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { Notify } from "../../shared/notification/notify";

const { Panel } = Collapse;

interface Certificate {
  Institution: string;
  name: string;
  certificateTitle: string;
  startDate: string;
  receivedDate: string;
}

const CertificateForm: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleCreateExperiences = async (Experience:Certificate) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/add-certificate-to-user`,
        {...Experience,userId:"cdd7e427-50f0-4231-bddb-277ba7e03ea8"}
      );
    } catch (error) {
      console.error("Error updating Experience:", error);
      Notify("success","Experience Info Added successfully")

    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        "http://20.21.120.66:3000/api/user/get-certificate-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
        // Replace "userId" with the actual ID of the user
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleCertificateChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleUpdateCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/add-certificate-to-user`,
        {Institution: certificate.Institution,
          certificateTitle:certificate.certificateTitle,
          name:certificate.name,
          receivedDate:certificate.receivedDate,
          startDate:certificate.startDate
}
      );
      Notify("success", "Certificate info updated successfully");
    } catch (error) {
      console.error("Error updating certificate:", error);
      Notify("error", "Error in updating certificate info");
    }
  };

  const handleCreateCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(
        "http://20.21.120.66:3000/api/user/add-certificate",
        certificate
      );
      Notify("success", "Certificate info added successfully");
    } catch (error) {
      console.error("Error creating certificate:", error);
      Notify("error", "Error in adding certificate info");
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/delete-certificate/${certificate.id}`
      );
      const updatedCertificates = certificates.filter(
        (cert) => cert.id !== certificate.id
      );
      setCertificates(updatedCertificates);
      Notify("success", "Certificate info deleted successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      Notify("error", "Error in deleting certificate info");
    }
  };

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      Institution: "",
      name: "",
      certificateTitle: "",
      startDate: "",
      receivedDate: "",
    };
    setCertificates([...certificates, newCertificate]);
  };

  return (
    <Card title="Certificate information" className="w-3/2 mx-auto mt-6">
      <Collapse>
        {certificates.map((certificate: Certificate, index: number) => (
          <Panel
            className="mb-2"
            header={`Certificate ${index + 1}`}
            key={certificate.id}
          >
           ```
            <Form layout="vertical">
              <Form.Item label="Institution">
                <Input
                  value={certificate.Institution}
                  onChange={(e) =>
                    handleCertificateChange(index, "Institution", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Name">
                <Input
                  value={certificate.name}
                  onChange={(e) =>
                    handleCertificateChange(index, "name", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Certificate Title">
                <Input
                  value={certificate.certificateTitle}
                  onChange={(e) =>
                    handleCertificateChange(index, "certificateTitle", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Start Date">
                <DatePicker
                  value={
                    certificate.startDate
                      ? moment(certificate.startDate)
                      : undefined
                  }
                  onChange={(date) =>
                    handleCertificateChange(
                      index,
                      "startDate",
                      date ? date.format("YYYY-MM-DD") : ""
                    )
                  }
                />
              </Form.Item>
              <Form.Item label="Received Date">
                <Input
                  value={certificate.receivedDate}
                  onChange={(e) =>
                    handleCertificateChange(index, "receivedDate", e.target.value)
                  }
                />
              </Form.Item>
              <div className=" flex space-x-4">
             
              <Button
                type="primary"
                 className="bg-primary"
                onClick={() => handleUpdateCertificate(certificate)}
              >
                Update
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteCertificate(certificate)}
              >
                Delete
              </Button>
              </div>
             
            </Form>
          </Panel>
        ))}
      </Collapse>
      <Button type="primary" className="bg-primary" onClick={handleAddCertificate}>
        Add Certificate
      </Button>
    </Card>
  );
};

export default CertificateForm;
