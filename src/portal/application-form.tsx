import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useApplyToLicenseMutation } from "./portal.query";

const { Option } = Select;

const LicenseForm = () => {
  const [apply, { data, isLoading }] = useApplyToLicenseMutation();

  const initialValues = {
    educationId: [],
    experienceId: [],
    certificateId: [],
  };

  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);

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
    setSubmitting(false); // Enable the form again

    try {
      apply(values);
      message.success("Successfully applied");
    } catch (err) {
      message.error("An error occurred");
    }
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
            label="Education ID"
            validateStatus={
              formikProps.errors.educationId && formikProps.touched.educationId
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
              value={formikProps.values.educationId}
              onChange={(value: any) =>
                formikProps.setFieldValue("educationId", value)
              }
            >
              {educations.map((education:any) => (
                <Option key={education.id} value={education.id}>
                  {education.professionalTitle}
                </Option>
              ))}
            </Field>
          </Form.Item>

          <Form.Item
            label="Experience"
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
              value={formikProps.values.experienceId}
              onChange={(value: any) =>
                formikProps.setFieldValue("experienceId", value)
              }
            >
              {experiences.map((experience:any) => (
                <Option key={experience.id} value={experience.id}>
                  {experience.name}
                </Option>
              ))}
            </Field>
          </Form.Item>

          <Form.Item
            label="Certificate"
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
              value={formikProps.values.certificateId}
              onChange={(value: any) =>
                formikProps.setFieldValue("certificateId", value)
              }
            >
              {certificates?.map((certificate:any) => (
                <Option key={certificate?.id} value={certificate?.id}>
                  {certificate?.certificateTitle}
                </Option>
              ))}
            </Field>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default LicenseForm;
