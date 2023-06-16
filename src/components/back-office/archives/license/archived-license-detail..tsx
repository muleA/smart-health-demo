import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../../shared/card';
import { Button, Card } from 'antd';

function ArchivedLicenseDetail() {
  const {id}= useParams();
  return (
    <><CollapsibleCard title={"Archived License Information's"}>
                   Archived license Information

      <Card className='flex space-x-16'>
       <Button className='bg-primary text-white'>Restore</Button>
       <Button type='primary' className='bg-red-400 ml-10  text-white'>Delete</Button>


      </Card>
    </CollapsibleCard>
    
      </>
  );
}

export default ArchivedLicenseDetail;
