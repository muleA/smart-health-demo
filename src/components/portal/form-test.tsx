import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, Button } from 'antd';

interface FormData {
  applicationType: string;
  applicationCategory: string;
  applierType: string;
  educationId: string[];
  experienceId: string[];
  certificateId: string[];
  state: string;
  subCity: string;
  woreda: string;
  kebele: string;
  houseNumber: string;
  phone: string;
  OwnerName: string;
  professionalName: string;
  professionalNameLastName: string;
  qualificationLevel: string;
  professionalLicenseNumber: string;
}

const StepTwoSchema = Yup.object().shape({
  applicationType: Yup.string().required("Application Type is required"),
  applicationCategory: Yup.string().required("Application Category is required"),
  applierType: Yup.string().required("Applier Type is required"),
  educationId: Yup.array().min(1, "At least one Education ID is required"),
  experienceId: Yup.array().min(1, "At least one Experience ID is required"),
  certificateId: Yup.array().min(1, "At least one Certificate ID is required"),
  state: Yup.string().required("State is required"),
  subCity: Yup.string().required("Sub City is required"),
  woreda: Yup.string().required("Woreda is required"),
  kebele: Yup.string().required("Kebele is required"),
  houseNumber: Yup.string().required("House Number is required"),
  phone: Yup.string().required("Phone is required"),
  OwnerName: Yup.string().required("Owner Name is required"),
  professionalName: Yup.string().required("Professional Name is required"),
  professionalNameLastName: Yup.string().required("Professional Last Name is required"),
  qualificationLevel: Yup.string().required("Qualification Level is required"),
  professionalLicenseNumber: Yup.string().required("Professional License Number is required"),
});

export const AppForm: React.FC = () => {
  const handleSubmit = (values: FormData) => {
    // Handle form submission and API call with the form values
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        applicationType: '',
        applicationCategory: '',
        applierType: '',
        educationId: [],
        experienceId: [],
        certificateId: [],
        state: '',
        subCity: '',
        woreda: '',
        kebele: '',
        houseNumber: '',
        phone: '',
        OwnerName: '',
        professionalName: '',
        professionalNameLastName: '',
        qualificationLevel: '',
        professionalLicenseNumber: '',
      }}
      validationSchema={StepTwoSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>Application Type</label>
          <Field type="text" name="applicationType" />
          <ErrorMessage name="applicationType" component="div" className="error" />
        </div>

        <div>
          <label>Application Category</label>
          <Field type="text" name="applicationCategory" />
          <ErrorMessage name="applicationCategory" component="div" className="error" />
        </div>

        <div>
          <label>Applier Type</label>
          <Field type="text" name="applierType" />
          <ErrorMessage name="applierType" component="div" className="error" />
        </div>

        <div>
          <label>Education ID</label>
          <Checkbox.Group name="educationId">
            <Checkbox value="id1">ID 1</Checkbox>
            <Checkbox value="id2">ID 2</Checkbox>
            {/* Add more checkboxes for educationId */}
          </Checkbox.Group>
          <ErrorMessage name="educationId" component="div" className="error" />
        </div>

        <div>
          <label>Experience ID</label>
          <Checkbox.Group name="experienceId">
            <Checkbox value="id1">ID 1</Checkbox>
            <Checkbox value="id2">ID 2</Checkbox>
            {/* Add more checkboxes for experienceId */}
          </Checkbox.Group>
          <ErrorMessage name="experienceId" component="div" className="error" />
        </div>

        <div>
          <label>Certificate ID</label>
          <Checkbox.Group name="certificateId">
            <Checkbox value="id1">ID 1</Checkbox>
            <Checkbox value="id2">ID 2</Checkbox>
            {/* Add more checkboxes for certificateId */}
          </Checkbox.Group>
          <ErrorMessage name="certificateId" component="div" className="error" />
        </div>

        <div>
          <label>State</label>
          <Field type="text" name="state" />
          <ErrorMessage name="state" component="div" className="error" />
        </div>

        <div>
          <label>Sub City</label>
          <Field type="text" name="subCity" />
          <ErrorMessage name="subCity" component="div" className="error" />
        </div>

        <div>
          <label>Woreda</label>
          <Field type="text" name="woreda" />
          <ErrorMessage name="woreda" component="div" className="error" />
        </div>

        <div>
          <label>Kebele</label>
          <Field type="text" name="kebele" />
          <ErrorMessage name="kebele" component="div" className="error" />
        </div>

        <div>
          <label>House Number</label>
          <Field type="text" name="houseNumber" />
          <ErrorMessage name="houseNumber" component="div" className="error" />
        </div>

        <div>
          <label>Phone</label>
          <Field type="text" name="phone" />
          <ErrorMessage name="phone" component="div" className="error" />
        </div>

        <div>
          <label>Owner Name</label>
          <Field type="text" name="OwnerName" />
          <ErrorMessage name="OwnerName" component="div" className="error" />
        </div>

        <div>
          <label>Professional Name</label>
          <Field type="text" name="professionalName" />
          <ErrorMessage name="professionalName" component="div" className="error" />
        </div>

        <div>
          <label>Professional Last Name</label>
          <Field type="text" name="professionalNameLastName" />
          <ErrorMessage name="professionalNameLastName" component="div" className="error" />
        </div>

        <div>
          <label>Qualification Level</label>
          <Field type="text" name="qualificationLevel" />
          <ErrorMessage name="qualificationLevel" component="div" className="error" />
        </div>

        <div>
          <label>Professional License Number</label>
          <Field type="text" name="professionalLicenseNumber" />
          <ErrorMessage name="professionalLicenseNumber" component="div" className="error" />
        </div>

        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
   </Formik>
)}