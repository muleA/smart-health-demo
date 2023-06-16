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

export const PermissionAssignment = (props: {
  tagAssignmentModalOpened: boolean;
  setTagAssignmentModalOpened: (visibility: boolean) => void;
  tid: unknown;
}) => {
  const [currentAssignedTags, setCurrentAssignedTags] = useState<any[]>([]);

  /* Hooks */
  const router = useParams();
  const { id } = router;
  const { data: assignedTags } = useGetPermissionByRoleIdQuery(id?.toString()??"");

  const { data: tags, isLoading: isTagsFetching } = useGetPermissionsQuery();

  const [assignTags, { isLoading: isAssigningTags }] = useAddPermissionToRoleMutation();

  /* Variables */
  const config: CollectionSelectorConfig = {
    visibleColumn: [{ key: 'name', name: 'Name' }, { key: 'description', name: 'Description' }],
    title: 'Permissions',
    size: 'md',
  };

  const onDone = async (data: SetStateAction<any[]>) => {
    console.log('data', data);
    setCurrentAssignedTags(data);
  };

  const onSave = async () => {
    try {
      await assignTags({
        roleId: id?.toString(),
        permissions: currentAssignedTags?.map((item) => ({
          permissionId: item.id,
          permissionName: item.name
        })),
      }).unwrap();
      message.success('Permission has been assigned to Roles successfully.');
    } catch (err) {
      message.error('Sorry, an error encountered while assigning Permissions.');
    }
  };

  const removeService = (tagId: any) => {
    setCurrentAssignedTags(currentAssignedTags.filter((item) => item.id !== tagId));
  };

   
   useEffect(() => {
    setCurrentAssignedTags(assignedTags);

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
  <Table.Column title="Name" dataIndex="name" />
  <Table.Column
  title="Action"
  dataIndex="id"
  render={(id: string) => (
  <Button color={'red'} className="bg-danger p-1" onClick={() => removeService(id)}>Delete
  {<DeleteFilled className="flex text-red-500" size={16} />}
  </Button>
  )}
  />
  </Table>
  <Button onClick={onSave} loading={isAssigningTags}>Save</Button>
  </>
  )
}