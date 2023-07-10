import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { Typography } from '@mui/material';
import timeSince from "../../../shared/utilities/time-since";
import { User } from "../../../models/user";
import { useGetUsersQuery } from "../../back-office.query";
import { DefaultPage } from "../../../shared/default-page";

export function Users() {
  const navigate = useNavigate();
  const { data: users, isLoading, isSuccess, isError, isFetching } = useGetUsersQuery();



  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/users/detail/${row?.original.id}`);
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
        header: 'Registered',
        accessorFn: (originalRow) => (
          <Typography variant="body2" sx={{ textTransform: "none" }}>
            {timeSince(originalRow?.createdAt)}
          </Typography>
        ),
      },
      
    ],
    []
  );

  return (
    <>

 
 <DefaultPage title={""} backButtonLink="/users" >
  <div >
  <MaterialReactTable
        columns={columns}
        data={users ?? []}
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

      
  