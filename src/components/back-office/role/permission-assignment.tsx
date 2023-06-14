
  import { SetStateAction, useEffect, useRef, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { Button, Table, message } from 'antd';
import { CollectionSelector, CollectionSelectorConfig } from '../../../shared/modal-collection-selctor';
import Empty from '../../../shared/empty-state';
import { DeleteColumnOutlined } from '@ant-design/icons';
import { SavedSearchOutlined } from '@mui/icons-material';
import { useGetPermissionsQuery, useUpdatePermissionMutation } from '../permission/permission.query';
  
  const PermissionAssignment = (props: {
    tagAssignmentModalOpened: boolean;
    setTagAssignmentModalOpened: (visibility: boolean) => void;
    tid: unknown;
  }) => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [currentAssignedTags, setCurrentAssignedTags] = useState<any[]>([]);
    /* collectionQuery for assigned tags */

  
    /* Hooks */
    const router = useParams();
    const { id } = router;
    const 
      { data: assignedTags } = useGetPermissionsQuery();
  
    const {data: tags, isLoading: isTagsFetching } =
    useGetPermissionsQuery();
  
    const [assignTags, { isLoading: isAssigningTags }] =
      useUpdatePermissionMutation();
  
    /* Variables */
    const config: CollectionSelectorConfig = {
      visibleColumn: [{ key: 'name', name: 'Name' },{key:"description",name:"Description"}],
      title: 'Permissions',
      size: 'md',
    };
  
    /* Event handlers */
    /* Event handlers */
    const inputRef = useRef<any>();
    const onSearch = (data: any) => {
      //Clear the previous timeout.
  console.log(data)
    };
 
  
    const onDone = async (data: SetStateAction<any[]>) => {
      setCurrentAssignedTags(data);
      setButtonDisabled(false);
    };
  
    const onSave = async () => {
      try {
        await assignTags({
          id: id?.toString(),
          tags: currentAssignedTags?.map((item) => item.id),
        }).unwrap();
        setButtonDisabled(true);
        message.success('Permission has been assigned to Roles successfully.');
      } catch (err) {
        message.error('Sorry, an error encountered while assigning Permissions.');
      }
    };
  
    const removeService = (tagId: any) => {
      setCurrentAssignedTags(
        currentAssignedTags.filter((item) => item.id !== tagId)
      );
      setButtonDisabled(false);
    };
  
    /* useEffect hooks */
    useEffect(() => {
        setCurrentAssignedTags(assignedTags?.data);
      
    }, [assignTags, assignedTags]);
  
/*     useEffect(() => {
      if (!props.tagAssignmentModalOpened) {
        triggerAssigned(id?.toString(), true);
      }
    }, [id, props.tagAssignmentModalOpened, triggerAssigned]); */
  
;
  
    return (
      <div>
        <>
          <CollectionSelector
            onDone={onDone}
            search={onSearch}
            total={tags?.length ?? 0}
            modalOpened={props.tagAssignmentModalOpened}
            setModalOpened={(visibility: boolean) =>
              props.setTagAssignmentModalOpened(visibility)
            }
            itemsLoading={isTagsFetching}
            items={tags ?? []}
            config={config}
            selectedRows={currentAssignedTags}
          />
          {!currentAssignedTags?.length && <Empty />}
          {currentAssignedTags?.length > 0 && (
            <>
              <Table className="my-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Name</th>
                    <th className="w-1">Action</th>
                  </tr>
                </thead>
  
                <tbody className="border-b">
                  {currentAssignedTags?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="flex justify-end">
                        <Button
                          color={'red'}
                          className="bg-danger p-1"
                          onClick={() => removeService(item.id)}
                        >
                          {<DeleteColumnOutlined className="flex" size={16} />}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
  
          <Button
            disabled={buttonDisabled}
            loading={isAssigningTags}
            className="my-2 bg-primary"
            onClick={onSave}
          >
            <SavedSearchOutlined />
            Save
          </Button>
        </>
      </div>
    );
  };
  
  export default PermissionAssignment;
  