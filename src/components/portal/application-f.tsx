import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from '../../configs/config';
import { TextField } from '@mui/material';

const initialValues = {
  applicationType: "",
  applicationCategory: "",
  applierType: "",
  firstName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  gender: "",
  dateOfBirth: "",
  placeOfBirth: "",
  nationality: "",
  profession: "",
  qualificationLevel: "",
  address: "",
  city: "",
  subCity: "",
  woreda: "",
  houseNumber: "",
  phone: "",
  professionalLicenseNumber: "",
  oldProfessionalLicenseNumber: "",
  professionalName: "",
  professionalNameLastName: "",
};

const validationSchema = Yup.object().shape({
  applicationType: Yup.string().required("Application Type is required"),
  applicationCategory: Yup.string().required("Application Category is required"),
  applierType: Yup.string().required("Applier Type is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  fatherName: Yup.string().required("Father Name is required"),
  motherName: Yup.string().required("Mother Name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  placeOfBirth: Yup.string().required("Place of Birth is required"),
  nationality: Yup.string().required("Nationality is required"),
  profession: Yup.string().required("Profession is required"),
  qualificationLevel: Yup.string().required("Qualification Level is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  subCity: Yup.string().required("SubCity is required"),
  woreda: Yup.string().required("Woreda is required"),
  houseNumber: Yup.string().required("House Number is required"),
  phone: Yup.string().required("Phone is required"),
  professionalLicenseNumber: Yup.string().required("Professional License Number is required"),
  oldProfessionalLicenseNumber: Yup.string(),
  professionalName: Yup.string(),
  professionalNameLastName: Yup.string()
});

export default function SteeperComponent(){
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios.post(baseUrl + "/api/apply-to-license", values).then(() => {
          message.success("Application submitted successfully");
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <form>
          <div className="font-bold text-md mb-2">Application Information</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label htmlFor="applicationType">
                Application Type
                <span className="text-red-400">*</span>
              </label>
              <Field as={TextField} type="text" name="applicationType" fullWidth margin="normal" />
              <ErrorMessage name="applicationType" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="applicationCategory">
                Application Category
                <span className="text-red-400">*</span>
              </label>
              <Field as={TextField} type="text" name="applicationCategory" fullWidth margin="normal" />
              <ErrorMessage name="applicationCategory" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="applierType">
                Applier Type
                <span className="text-red-400">*</span>
              </label>
              <Field as={TextField} type="text" name="applierType" fullWidth margin="normal" />
              <ErrorMessage name="applierType" component="div" className="text-red-500" />
            </div>
          </div>

          {/* Additional form fields */}
          
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
