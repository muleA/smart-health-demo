import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { IconButton, Typography } from '@mui/material';
import {AddCircle, ArrowRightAlt } from '@mui/icons-material';
import timeSince from "../../../shared/utilities/time-since";
import { User } from "../../../models/user";
import { useGetRolesQuery } from "../../back-office.query";
import { DefaultPage } from "../../../shared/default-page";
import { Role } from "../../../models/role";

export function Roles() {
  const navigate = useNavigate();
  const { data: roles, isLoading, isSuccess, isError, isFetching } = useGetRolesQuery();
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/roles/detail/${row?.original.id}`);
  };

 

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ' Name',
      },
      {
        accessorKey: 'key',
        header: ' Key',
      },
      {
        accessorKey: 'description',
        header: ' Description',
      },
      {
        accessorKey: 'isDefault',
        header: ' Default',
        Cell: (isDefault) => (isDefault ? 'True' : 'False'),
      },
     
    ],
    []
  );

  return (
    <>
 <DefaultPage   primaryButtonProps={{
      children: "New",
      onClick: () => {
        navigate(`/roles/new`)
      },
    }} >
  <div>
  <MaterialReactTable
        columns={columns}
        data={roles ?? []}
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

      
  