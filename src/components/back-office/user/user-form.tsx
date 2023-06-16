import { Card, Form, Input, Button, message, Spin, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useArchiveUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useUpdatedUserMutation,
} from "../../back-office.query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = (props: { id?: string; mode: "new" | "update" }) => {
  const [createUser, { isLoading: isCreating }] = useUpdatedUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdatedUserMutation();
  const { data: user, isLoading: isDetailsLoading } = useGetUsersQuery();
const navigate=useNavigate()
  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    city: Yup.string().required("Phone number is required"),
    gneder: Yup.string().required("Last name is required"),
    houseNumber: Yup.string().required("Last name is required"),
    kebele: Yup.string().required("Last name is required"),
    wereda: Yup.string().required("Last name is required"),
  middleName: Yup.string().required("Last name is required"),
  subCity: Yup.string().required("Last name is required"),

  });

  const { id } = useParams();
  console.log("id", id);
  console.log("mode", id);
  const[trigger, {data:userInfo,isLoading}]=useLazyGetUserByIdQuery()
  const[archiveUser,{data:archive,isLoading:archivingUser}]=useArchiveUserMutation()
   useEffect(() => {
    if (id) {
      trigger(props?.id);
    }
  }, [id, trigger]);
 
  // Define the form submission function
  const handleSubmit = async (values: any) => {
    try {
      if (props.mode === "new") {
        await createUser(values);
        message.success("User created successfully");
      } else if (props.mode === "update") {
        await updateUser({ id: props.id, ...values });
        message.success("User updated successfully");
      }
    } catch (error) {
      message.error("Error occurred while saving user");
    }
  };
  const handleArchive=async()=>{
    try {
        await archiveUser(props?.id);
        message.success("User archived successfully");
    navigate("/users")
    } catch (error) {
      message.error("Error occurred while archiving user");
    }
  }

  // Use Formik to handle form state and submission
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city:"",
      subCity:"",
      gender:"",
      wereda:"",
      kebele:"",
      middleName:""
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  console.log("useriNfo",userInfo)
  // Fetch user details when in "update" mode
  /*  useEffect(() => {
    if (props.mode === 'update' && props.id) {
      trigger(props.id);
    }
  }, [props.mode, props.id, trigger]); */

  // Update form data when user details are fetched
   useEffect(() => {
    if (props?.mode === 'update' && userInfo) {
      const { firstName, lastName, email, phone,gender,kebele,city,subCity,middleName,wereda} = userInfo;
      formik.setValues({ firstName, lastName, email, phone,gender,kebele,wereda,city,subCity,middleName});
    }
  }, [ props?.mode, userInfo]);

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
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
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
              name="phoneNumber"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </Form.Item>
          <Form.Item label="Gender" required>
            <Input
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            />
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500">{formik.errors.gender}</div>
            )}
          </Form.Item>
          <Form.Item label="city" required>
            <Input
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500">{formik.errors.city}</div>
            )}
          </Form.Item>
          <Form.Item label="SUb City" required>
            <Input
              name="subCity"
              value={formik.values.subCity}
              onChange={formik.handleChange}
            />
            {formik.touched.subCity && formik.errors.subCity && (
              <div className="text-red-500">{formik.errors.subCity}</div>
            )}
          </Form.Item>
          
          <Form.Item label="Kebele" required>
            <Input
              name="kebele"
              value={formik.values.kebele}
              onChange={formik.handleChange}
            />
            {formik.touched.kebele && formik.errors.kebele && (
              <div className="text-red-500">{formik.errors.kebele}</div>
            )}
          </Form.Item>
          <Form.Item label="woreda" required>
            <Input
              name="wereda"
              value={formik.values.wereda}
              onChange={formik.handleChange}
            />
            {formik.touched.wereda && formik.errors.wereda && (
              <div className="text-red-500">{formik.errors.wereda}</div>
            )}
          </Form.Item>
          
          
          <Form.Item>
            <div className="flex space-x-4">
             
              {props?.mode !== "new" && (
                <>
               
                  <Button
                    htmlType="button"
                    className="hover:bg-red-400 hover:text-white text-white bg-red-600"
                     onClick={handleArchive}
                     loading={archivingUser}
                  >
                    Archive
                  </Button>
                
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserForm;
