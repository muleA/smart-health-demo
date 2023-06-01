import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const { Option } = Select;

const LicenseForm = () => {
  const initialValues = {
    applicationType: "",
    applierType: "",
    educationId: [],
    experienceId: [],
    certificateId: [],
  };

  const [educations, setEducations] = useState<any>([]);
  const [experiences, setExperiences] = useState<any>([]);
  const [certificates, setCertificates] = useState<any>([]);
   console.log("certificates",certificates);
   console.log("experiences",experiences)
   console.log("educations",educations)
  useEffect(() => {
    fetchEducations();
    fetchExperiences();
    fetchCertificates();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get(
        "http://20.21.120.66:3000/api/user/get-education-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
      );
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        "http://20.21.120.66:3000/api/user/get-experience-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
      );
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        "http://20.21.120.66:3000/api/user/get-certificate-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    applicationType: Yup.string().required("Application Type is required"),
    applierType: Yup.string().required("Applier Type is required"),
    educationId: Yup.array()
      .min(1, "At least one Education ID is required")
      .required("Education ID is required"),
    experienceId: Yup.array()
      .min(1, "At least one Experience ID is required")
      .required("Experience ID is required"),
    certificateId: Yup.array()
      .min(1, "At least one Certificate ID is required")
      .required("Certificate ID is required"),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form layout="vertical" onFinish={formikProps.handleSubmit}>
          <Form.Item
            label="Application Type"
            validateStatus={
              formikProps.errors.applicationType &&
              formikProps.touched.applicationType
                ? "error"
                : ""
            }
            help={
              formikProps.errors.applicationType &&
              formikProps.touched.applicationType
                ? formikProps.errors.applicationType
                : ""
            }
          >
            <Field name="applicationType" as={Input} />
          </Form.Item>

          <Form.Item
            label="Applier Type"
            validateStatus={
              formikProps.errors?.applierType && formikProps.touched?.applierType
                ? "error"
                : ""
            }
            help={
              formikProps.errors?.applierType && formikProps?.touched?.applierType
                ? formikProps?.errors?.applierType
                : ""
            }
          >
            <Field name="applierType" as={Input} />
          </Form.Item>

          <Form.Item
            label="Education ID"
            validateStatus={
              formikProps?.errors?.educationId && formikProps.touched.educationId
                ? "error"
                : ""
            }
            help={
              formikProps.errors.educationId && formikProps.touched.educationId
                ? formikProps.errors.educationId
                : ""
            }
          >
            <Field
              name="educationId"
              as={Select}
              mode="multiple"
              loading={educations.length === 0}
            >
              {educations.map((education) => (
                <Option key={education.id} value={education.id}>
                  {education.professionalTitle}
                </Option>
              ))}
            </Field>
          </Form.Item>

          <Form.Item
            label="Experience ID"
            validateStatus={
              formikProps.errors.experienceId && formikProps.touched.experienceId
                ? "error"
                : ""
            }
            help={
              formikProps.errors.experienceId && formikProps.touched.experienceId
                ? formikProps.errors.experienceId
                : ""
            }
          >
            <Field
              name="experienceId"
              as={Select}
              mode="multiple"
              loading={experiences.length === 0}
            >
              {experiences.map((experience:any) => (
                <Option key={experience.id} value={experience.id}>
                  {experience.name}
                </Option>
              ))}
            </Field>
          </Form.Item>

          <Form.Item
            label="Certificate ID"
            validateStatus={
              formikProps.errors.certificateId && formikProps.touched.certificateId
                ? "error"
                : ""
            }
            help={
              formikProps.errors.certificateId && formikProps.touched.certificateId
                ? formikProps.errors.certificateId
                : ""
            }
          >
            <Field
              name="certificateId"
              as={Select}
              mode="multiple"
              loading={certificates.length === 0}
            >
              {certificates?.map((certificate:any) => (
                <Option key={certificate?.id} value={certificate?.id}>
                  {certificate?.certificateTitle}
                </Option>
              ))}
            </Field>
          </Form.Item>

          
          <Button type="primary" className="bg-primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LicenseForm;
