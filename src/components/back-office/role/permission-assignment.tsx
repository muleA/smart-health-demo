import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, message } from 'antd';
import Empty from '../../../shared/empty-state';
import { DeleteColumnOutlined, DeleteFilled } from '@ant-design/icons';
import { Delete, SavedSearchOutlined } from '@mui/icons-material';
import { useGetPermissionByRoleIdQuery, useGetPermissionsQuery, useUpdatePermissionMutation } from '../permission/permission.query';
import ModalCollectionSelector from '../../../shared/modal-collection-selctor';
import { CollectionSelectorConfig } from '../../../shared/collection-selector-config';
import { useAddPermissionToRoleMutation } from './role.query';
import { useGetRoleByRoleIdQuery } from '../license/license.query';

export const PermissionAssignment = (props: {
  tagAssignmentModalOpened: boolean;
  setTagAssignmentModalOpened: (visibility: boolean) => void;
  tid: unknown;
}) => {
  const [currentAssignedTags, setCurrentAssignedTags] = useState<any[]>([]);

  /* Hooks */
  const router = useParams();
  const { id } = router;
  const { data: assignedTags } = useGetRoleByRoleIdQuery(id?.toString()??"");

  const { data: tags, isLoading: isTagsFetching } = useGetPermissionsQuery();

  const [assignTags, { isLoading: isAssigningTags }] = useAddPermissionToRoleMutation();

  /* Variables */
  const config: CollectionSelectorConfig = {
    visibleColumn: [{ key: 'name', name: 'Name' }, { key: 'description', name: 'Description' }],
    title: 'Permissions',
    size: 'md',
  };

  const onDone = async (data: any[]) => {
    setCurrentAssignedTags(data);
    try {
      await assignTags({
        roleId: id?.toString(),
        permissions: data?.map((item: { id: any; name: any; description:any}) => ({
          permissionId: item.id,
          permissionName: item.name,
          permissionDescription: item.description
        })),
      }).unwrap();
      message.success('Permission has been assigned to Roles successfully.');
    } catch (err) {
      message.error('Sorry, an error encountered while assigning Permissions.');
    }
  };

  const onSave = async () => {
    try {
      await assignTags({
        roleId: id?.toString(),
        permissions: currentAssignedTags?.map((item) => ({
          permissionId: item.id.toString(),
          permissionName: item.name,
          permissionDescription: item.description,
        })),
      }).unwrap();
      message.success('Permission has been assigned to Roles successfully.');
    } catch (err) {
      message.error('Sorry, an error encountered while assigning Permissions.');
    }
  };

  const removeService = (tagId: any) => {
    setCurrentAssignedTags(currentAssignedTags?.filter((item) => item.permissionId !== tagId));
  };

   
   useEffect(() => {
    setCurrentAssignedTags(assignedTags?.rolePermission??[]);

  }, [assignTags, assignedTags]); 
  
 /*  useEffect(() => {
  if (!props.tagAssignmentModalOpened) {
  triggerAssigned(id?.toString(), true);
  }
  }, [id, props.tagAssignmentModalOpened]);
   */
  return (
  <>
  <ModalCollectionSelector
  onDone={onDone}
  loading={isTagsFetching}
  modalOpened={props.tagAssignmentModalOpened}
  setModalOpened={(visibility: boolean) => props.setTagAssignmentModalOpened(visibility)}
  items={tags ?? []}
  config={config}
  />
  
  <Table className="my-4" dataSource={currentAssignedTags}>
  <Table.Column title="key" dataIndex="key" />
  <Table.Column title="Name of Permission" dataIndex="permissionName" />



  </Table>
{/*   <Button onClick={onSave} loading={isAssigningTags}>Save</Button>
 */}  </>
  )
}