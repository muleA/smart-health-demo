import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, message } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import ModalCollectionSelector from '../../../shared/modal-collection-selctor';
import { CollectionSelectorConfig } from '../../../shared/collection-selector-config';
import { useGetRolesQuery } from '../../back-office.query';
import { useAddRoleToEmployeeMutation, useGetRoleToEmployeeQuery } from './employee.query';

export const RoleAssignment = (props: {
  tagAssignmentModalOpened: boolean;
  setTagAssignmentModalOpened: (visibility: boolean) => void;
  tid: unknown;
}) => {
  const [currentAssignedTags, setCurrentAssignedTags] = useState<any[]>([]);
console.log("currentAssignedTags",currentAssignedTags)
  /* Hooks */
  const router = useParams();
  const { id } = router;
  const { data: assignedTags } = useGetRoleToEmployeeQuery(id?.toString()??"");

  const { data: tags, isLoading: isTagsFetching } = useGetRolesQuery();

  const [assignTags, { isLoading: isAssigningTags }] = useAddRoleToEmployeeMutation();

  /* Variables */
  const config: CollectionSelectorConfig = {
    visibleColumn: [{ key: 'name', name: 'Name' }, { key: 'description', name: 'Description' }],
    title: 'Roles',
    size: 'md',
  };

  const onDone = async (data: SetStateAction<any[]>) => {
    console.log('data on done', data);
    setCurrentAssignedTags(data);
  };

  const onSave = async () => {
    try {
      const payload = currentAssignedTags?.map((item) => ({
        roleName: item.name,
        roleDescription:item.description,
        roleId: item.id.toString(),
      }));
      console.log("payload",payload)
      await assignTags({payload:payload,empId:id?.toString()}).unwrap();
      message.success("Role has been assigned to Employee successfully.");
    } catch (err) {
      message.error("Sorry, an error encountered while assigning Roles.");
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
  <Table.Column title="Name of Roles" dataIndex="name" />
  <Table.Column title="Description" dataIndex="description" />
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