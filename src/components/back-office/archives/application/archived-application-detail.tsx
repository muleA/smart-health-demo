import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../../shared/card';
import { Button, Card } from 'antd';

function ArchivedApplicationDetail() {
  const {id}= useParams();
  return (
    <><CollapsibleCard title={"Archived Application Information's"}>
                   Archived Application Information

      <Card className='flex space-x-16'>
       <Button type='primary' className='bg-primary ml-10  text-white'>Restore</Button>
       <Button type='primary' className='bg-red-400 ml-10  text-white'>Delete</Button>
      </Card>
    </CollapsibleCard>
    <CollapsibleCard title={"Archived Education Information's"}>
    Archived Education Attached
    </CollapsibleCard>
    
    <CollapsibleCard title={"Experience Information's"}>
    Archived Experience Attached
    </CollapsibleCard>


    <CollapsibleCard title={"Certificates Information's"}>
    Archived certificate Attached
    </CollapsibleCard>
      </>
  );
}

export default ArchivedApplicationDetail;
