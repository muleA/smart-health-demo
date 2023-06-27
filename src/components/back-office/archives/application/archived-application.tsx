import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../../shared/default-page";
import { useGetArchivedAppsQuery } from "../../../back-office.query";

export function ArchivedApplication() {
  const navigate = useNavigate();
  const { data: applications, isLoading, isSuccess, isError, isFetching } = useGetArchivedAppsQuery();
  console.log("applications",applications)
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/archived-applications/detail/${row?.original.id}`);

  };

 

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'applicationType',
        header: ' applicationType',
      },
      {
        accessorKey: 'applicationCategory',
        header: ' applicationCategory',
      },
      {
        accessorKey: 'applierType',
        header: ' applierType',
      },
      {
        accessorKey: 'comment',
        header: ' comment',
      }, {
        accessorKey: 'createdAt',
        header: ' createdAt',
      },
      {
        accessorKey: 'status',
        header: ' status',
      },
     
    ],
    []
  );

  return (
    <>
 <DefaultPage title={"Applications"} backButtonLink="/license"   >
  <div>
  <MaterialReactTable
        columns={columns}
        data={applications ?? []}
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

      
  
