import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../shared/card';
import { Button, Card } from 'antd';

function DetailLicense() {
  const {id}= useParams();
  return (
    <><CollapsibleCard title={"License Information's"}>
                    license Information

      <Card className='flex space-x-16'>
       <Button className='bg-primary text-white'>ChangeStatus</Button>
       <Button type='primary' className='bg-red-400 ml-10  text-white'>Archive</Button>


      </Card>
    </CollapsibleCard>
    
      </>
  );
}

export default DetailLicense;
