import React from 'react';

const DashboardGreeting = (props:{userFullName:string}) => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
 greeting = 'Good Morning';
  } else if (currentHour < 18) {
 greeting = 'Good Afternoon';
  } else {
 greeting = 'Good Evening';
  }

  return (
 <>
 <p className='text-sm md:text-lg line-clamp-3 lg:line-clamp-none'>{greeting}<span className='text-primary'> {`${props?.userFullName}`},</span>  Welcome to Smart Health eLicense System</p>

 </>
)}
export default DashboardGreeting;