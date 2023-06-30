import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../shared/card';
import { Button, Card } from 'antd';

function ApplicationDetail() {
  const {id}= useParams();
  return (
    <><CollapsibleCard title={"Application Information's"}>
                    Application Informationeeeeeeeeeeeeeee

      <Card className='flex space-x-16'>
       <Button className='bg-primary text-white'>Approve</Button>
       <Button type='primary' className='bg-red-400 ml-10  text-white'>Archive</Button>
       <Button type='primary' className='bg-red-400 ml-10  text-white'>Reject</Button>
      </Card>
    </CollapsibleCard>
    <CollapsibleCard title={"Education Information's"}>
                    Education Attached
    </CollapsibleCard>
    
    <CollapsibleCard title={"Experience Information's"}>
                    Experience Attached
    </CollapsibleCard>


    <CollapsibleCard title={"Certificates Information's"}>
                    certificate Attached
    </CollapsibleCard>
      </>
  );
}

export default ApplicationDetail;
