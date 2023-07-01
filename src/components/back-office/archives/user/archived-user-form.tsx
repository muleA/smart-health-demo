import { Form, Input, Button, message, Spin } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useLazyGetArchivedUserByUserIdQuery,
  useRestoreUserMutation,
} from "../../../back-office.query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ArchivedUserForm = (props: { id?: string; mode: "new" | "update" }) => {
  const [RestoreUser, { isLoading: restoring,isError}] = useRestoreUserMutation();
  const [trigger,{ data: user, isLoading: isDetailsLoading }] = useLazyGetArchivedUserByUserIdQuery();

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().required("middle name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("city is required")
      
  });

  const { id } = useParams();
  console.log("id", id);
  console.log("mode", id);
    useEffect(() => {
    if (id) {
      trigger(id as any);
    }
  }, [id, trigger]);

  // Define the form submission function
  const handleSubmit = async (values: any) => {
    try {
      await RestoreUser(props?.id);
      isError?      message.error("Error occurred while saving user"): message.success("User updated successfully");
    } catch (error) {
    }
  };
  const navigate=useNavigate()
  const handleRestore=async ()=>{
    try {
      await RestoreUser(props?.id).unwrap;
      isError?message.error("Error occurred while Restoring user"): message.success("User Restored successfully");
      navigate("/archives/archived-users")
    } catch (error) {
    }
  }

  // Use Formik to handle form state and submission
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName:"",
      lastName: "",
      email: "",
      phone: "",
      city:"",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Fetch user details when in "update" mode
    useEffect(() => {
    if (props.mode === 'update' && props.id) {
      trigger(props.id as any);
    }
  }, [props.mode, props.id, trigger]); 

  // Update form data when user details are fetched
  console.log("user", user);
    useEffect(() => {
    if (props.mode === 'update' && user) {
      const { firstName, middleName,lastName,city, email, phone,password} = user;
      formik.setValues({ firstName,middleName, lastName, email, phone,city,password });
    }
  }, [ props.mode, user]);  

  return (
    <div>
      {isDetailsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Form layout="vertical" onFinish={formik.handleSubmit}>
     
          <Form.Item label="First Name" required>
            <Input
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500">{formik.errors.firstName}</div>
            )}
          </Form.Item>
          <Form.Item label="Middle Name" required>
            <Input
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
            />
            {formik.touched.middleName && formik.errors.middleName && (
              <div className="text-red-500">{formik.errors.middleName}</div>
            )}
          </Form.Item>
          <Form.Item label="Last Name" required>
            <Input
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500">{formik.errors.lastName}</div>
            )}
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </Form.Item>
          <Form.Item label="Phone Number" required>
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </Form.Item>
          <Form.Item label="City" required>
            <Input
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500">{formik.errors.city}</div>
            )}
          </Form.Item>
          <Form.Item>
            <div className="flex space-x-4">
              <Button
                type="primary"
                onClick={handleRestore}
               loading={restoring}
                className="bg-red-500"
              >
               Restore
              </Button>
               
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ArchivedUserForm;
