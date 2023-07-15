import React from 'react';
type DashboardCardType={
 label:string;
 value:number;
 icon:JSX.Element;
}
const DashboardCard = ({ label, value, icon }:DashboardCardType) => {
  return (
 <div className="shadow-md p-4">
<div>
  <div className="flex flex-col">
 <div className="flex space-x-8 w-56">
<div>
  <div className="uppercase text-sm text-gray-400">{value}</div>
  <div className="mt-1">
 <div className="mx-8md:flex space-x-2 items-center">
<div className="text-2xl">{label}</div>
<div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
 </div>
  </div>
</div>
<div>

 {icon}
</div>
 </div>
  </div>
</div>
 </div>
  );
};

export default DashboardCard;
