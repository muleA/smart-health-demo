import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowRightAlt } from '@mui/icons-material';
import timeSince from "../../../shared/utilities/time-since";
import { User } from "../../../models/user";
import { DefaultPage } from "../../../shared/default-page";
import { useGetEmployeesQuery } from "./employee.query";

export function Employees() {
  const navigate = useNavigate();
  const { data: Employees, isLoading, isSuccess, isError, isFetching } = useGetEmployeesQuery();

  const handleAddClick = () => {
    navigate('/add-employee');
  };

  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/Employees/detail/${row?.original.id}`);
  };

  const CustomHeader = () => {
    return (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employees
        </Typography>
        <Button color="primary" onClick={handleAddClick}>
          <AddCircleOutlineOutlined />
        </Button>
      </Toolbar>
    );
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
     
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
    
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        accessorFn: (originalRow) => (
          <Typography variant="body2" sx={{ textTransform: "none" }}>
            {timeSince(originalRow?.createdAt)}
          </Typography>
        ),
      },
      {
        accessorKey: 'id',
        header: '',
        Cell: () => (
          <IconButton>
            <ArrowRightAlt />
          </IconButton>
        ),
       
      },
    ],
    []
  );

  return (
    <>
{/*       <CustomHeader />


 */}      
 
 <DefaultPage title={"Employees"} backButtonLink="/Employees" 
 primaryButtonProps={{
      children: "New",
      onClick: () => {
        navigate("/employees/new")
      },
    }}  >
  <div>
  <MaterialReactTable
        columns={columns}
        data={Employees ?? []}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row),
          sx: {
            cursor: "pointer",
          },
        })}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 15, 25, 50, 100, 1000],
        }}
        enableGrouping
        enablePagination
        manualPagination
        state={{
          isLoading: isLoading,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          density: "compact",
        }}
        enablePinning={true}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
      />
  </div>

 </DefaultPage>

    </>
  );
}

      
  