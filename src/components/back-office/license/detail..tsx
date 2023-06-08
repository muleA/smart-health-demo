import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../shared/card';

function DetailRole() {
  const {id}= useParams();
  return (
    <><CollapsibleCard title={"Role Information's"}>
list
    </CollapsibleCard>
    
      </>
  );
}

export default DetailRole;
