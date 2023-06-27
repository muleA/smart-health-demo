import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Checkbox, Button, Input, message } from 'antd';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteFilled, SaveFilled } from '@ant-design/icons';
import { Permission } from '../../../models/permission';
import { Edit } from '@mui/icons-material';
import { useCreatePermissionMutation, useDeletePermissionMutation, useUpdatePermissionMutation } from './permission.query';
import IsPermitted from '../../../shared/auth/is-permitted';
import { CreatePermission, UpdateUserPermission } from '../../../shared/shell/permissions-list';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  key: Yup.string().required('Key is required'),
  description: Yup.string().required('Description is required'),
});

const PermissionForm = (props: { mode: "new" | 'update', id?: string,data?:Permission }) => {
  const [createPermission, { isLoading }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading:updateLoading }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading:deleteLoading }] = useDeletePermissionMutation();
const {id}=useParams()
  const navigate = useNavigate();
  const handleDelete=async ()=>{
    try {
      // Call the createPermission API with the form values
      await deletePermission(id);

      // Display success message
      message.success('Permission deleted successfully');
      navigate("/Permissions");
    } catch (error) {
      // Display error message
      message.error('Failed to delete Permission');
    }
  }

  const handleSubmit = async (values: any) => {
    if(props?.mode==='new'){
      try {
        // Call the createPermission API with the form values
        await createPermission(values);
  
        // Display success message
        message.success('Permission created successfully');
        navigate("/Permissions");
      } catch (error) {
        // Display error message
        message.error('Failed to create Permission');
      }
    }else {
      try {
        // Call the createPermission API with the form values
        await updatePermission({...values,id:id});
        // Display success message
        message.success('Permission Updated successfully');
      } catch (error) {
        // Display error message
        message.error('Failed to create Permission');
      }
    }
   
  };

  const initialValues = props.mode === 'update'
    ? {
        name: props?.data?.name || '',
        key: props?.data?.key || '',
        description: props?.data?.description || '',
        isActive: props?.data?.isActive || false,
      }
    : {
        name: '',
        key: '',
        description: '',
        isActive: false,
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" as={Input} />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className='mb-2'>
            <label htmlFor="key">Key</label>
            <Field type="text" id="key" disabled={props?.mode==='update'} name="key" as={Input} />
            <ErrorMessage name="key" component="div" className="error" />
          </div>

          <div className='mb-2'>
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" as={Input} />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <div className='mb-2'>
            <label htmlFor="isActive">Is Active</label>
            <Field type="checkbox" id="isActive" className="ml-2" name="isActive" as={Checkbox} />
          </div>

          <div className='mb-2 space-x-4'>
            {props.mode === "new" && (
              <Button
                type="primary"
                loading={isLoading}
                className='bg-primary text-white mt-4'
                htmlType="submit"
                disabled={isSubmitting}
                icon={<SaveFilled />}
              >
                Create
              </Button>
            )}

<IsPermitted requiredPermissions={UpdateUserPermission}>
{props.mode === "update" && (
              <Button type="primary" icon={<Edit/>} loading={updateLoading} className='bg-primary text-white' htmlType="submit" disabled={isSubmitting}>
                Update
              </Button>
            )}
</IsPermitted>
           

            {props.mode === "update" && (
              <IsPermitted requiredPermissions={CreatePermission}>
    <Button type="primary" icon={<DeleteFilled/>} loading={deleteLoading} onClick={handleDelete} danger className='bg-danger text-white' htmlType="button" disabled={isSubmitting}>
                Delete 
              </Button>
              </IsPermitted>
          
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PermissionForm;
