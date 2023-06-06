import { Button, Card } from "antd";
import CustomTable from "./table";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table'; // v1.12.0 and above (recommended)
import { MRT_ColumnDef } from 'material-react-table'; // If using TypeScript (optional, but recommended)

export  function Users(){
const navigate=useNavigate();
interface Person {
    name: string;
    age: number;
  }
  
  //mock data - strongly typed if you are using TypeScript (optional, but recommended)
  const data: Person[] = [
    {
      name: 'John',
      age: 30,
    },
    {
      name: 'Sara',
      age: 25,
    },
  ];
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorFn: (originalRow: { age: any; }) => originalRow.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
      },
    ],
    [],
  );

return(<>
 <Card size="small"       
 className="mt-4 " title="Customer List" extra={<Button onClick={()=>navigate("/new-user")} type="primary"
  icon={<PlusOutlined style={{display:"inline-block",verticalAlign:"middle",marginRight:"4px",padding:'2px'}} size={24} />} 
 className="bg-primary-600 h-64">New</Button>
} >
 <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection //enable some features
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
    />

</Card>


    </>)
}