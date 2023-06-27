import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../shared/default-page";
import { useGetPermissionsQuery } from "./permission.query";
import { Permission } from "../../../models/permission";

export default function PermissionsList() {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: permissions, isLoading, isSuccess, isError, isFetching } = useGetPermissionsQuery();
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/permissions/detail/${row?.original.id}`);
  };

 

  const columns = useMemo<MRT_ColumnDef<Permission>[]>(
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
        accessorKey: 'isActive',
        header: ' Active',
        Cell: (isActive) => (isActive ? 'True' : 'False'),
      },
     
    ],
    []
  );

  return (
    <>
 <DefaultPage title={"permissions"} backButtonLink="/permissions"   primaryButtonProps={{
      children: "New",
      onClick: () => {
        navigate("/permissions/new")
      },
    }} >
  <div>
  <MaterialReactTable
        columns={columns}
        data={permissions ?? []}
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

      
  