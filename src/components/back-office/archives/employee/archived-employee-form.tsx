import { Card, Form, Input, Button, message, Spin, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useDeleteEmployeeMutation,
  useGetUsersQuery,
  useLazyGetArchivedEmployeesByEmployeeIdQuery,
  useRestoreEmployeeMutation,
  useUpdatedUserMutation,
} from "../../../back-office.query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SaveFilled } from "@ant-design/icons";
import { Edit } from "@mui/icons-material";

const ArchivedEmployeeForm = (props: { id?: string; mode: "new" | "update" }) => {
  const [deleteEmployee, { isLoading: isDeleting,isError:deleteError }] = useDeleteEmployeeMutation();
  const [restoreEmployee, { isLoading: isRestoring ,isError}] = useRestoreEmployeeMutation();
  const [trigger,{ data: employees, isLoading: isDetailsLoading }] = useLazyGetArchivedEmployeesByEmployeeIdQuery();

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    profilePicture: Yup.string().required("Profile picture is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const { id } = useParams();
  console.log("id", id);
  console.log("mode", id);
   
  // Define the form submission function
  const handleSubmit = async (values: any) => {
    try {
      if (props.mode === "new") {
/*         await createUser(values);
 */        message.success("User created successfully");
      } else if (props.mode === "update") {
        message.success("User updated successfully");
      }
    } catch (error) {
      message.error("Error occurred while saving user");
    }
  };
  const handleRestore=async()=>{
await deleteEmployee(props?.id)
isError?      message.error("Error occurred while Restoring user"):message.success("Employee Restored successfully");


  }

  const handleDelete=async()=>{
    await restoreEmployee(props?.id)

    deleteError?message.error("Error occurred while deleting user"):message.success("Employee deleting successfully");

  }

  // Use Formik to handle form state and submission
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profilePicture: null,
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Fetch user details when in "update" mode
  useEffect(() => {
    if (props.mode === 'update' && props.id) {
      trigger(id as any);
    }
  }, [props.mode, props.id, trigger])

  // Update form data when user details are fetched
  console.log("user", employees);
     useEffect(() => {
    if (props.mode === 'update' && employees) {
      const { firstName, lastName, email, phone, profilePicture ,password} =employees;
      formik.setValues({ firstName, lastName, email, phone, profilePicture,password });
    }
  }, [props.mode, employees]);

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
          {props.mode === "new" && (
            <Form.Item label="Profile Picture" required>
              <Upload
                accept="image/*"
                name="profilePicture"
                listType="picture"
                beforeUpload={(file) => {
                  formik.setFieldValue("profilePicture", file.uid); // Convert the value to a string
                  return false;
                }}
              >
                <Button>Select Picture</Button>
              </Upload>
              {formik.touched.profilePicture &&
                formik.errors.profilePicture && (
                  <div className="text-red-500">
                    {formik.errors.profilePicture}
                  </div>
                )}
            </Form.Item>
          )}
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
         
          <Form.Item>
            <div className="flex space-x-4">
              <Button
                type="primary"
                className="bg-primary"
                onClick={handleRestore}
                loading={isRestoring}
              >
                Restore
              </Button>
                <>
                  <Button
                    htmlType="button"
                    loading={isDeleting}
                    onClick={handleDelete}
                    className="hover:bg-red-400 hover:text-white text-white bg-red-600"
                  >
                    Delete
                  </Button>
                </>
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ArchivedEmployeeForm;
