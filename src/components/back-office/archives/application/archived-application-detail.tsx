import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../../shared/card';
import { Button, Card, message } from 'antd';
import { useRestoreApplicationMutation } from '../../../portal.query';

function ArchivedApplicationDetail() {
  const {id}= useParams();
  const[restoreApplications,{isLoading,isError}]=useRestoreApplicationMutation()

  const handleRestore=async()=>{
    try{
    await restoreApplications(id as string)
    isError? message.error("error occurred while restoring"):message.success("Application Restored")
    }catch(err){

    }
  }
  return (
    <><CollapsibleCard title={"Archived Application Information's"}>
                   Archived Application Information

      <Card className='flex space-x-16'>
       <Button type='primary' className='bg-primary ml-10  text-white' onClick={handleRestore} loading={isLoading}>Restore</Button>
{/*        <Button type='primary' className='bg-red-400 ml-10  text-white'>Delete</Button>
 */}      </Card>
    </CollapsibleCard>
   
      </>
  );
}

export default ArchivedApplicationDetail;
