import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../shared/default-page";
import {useGetApplicationsQuery, useGetSubmittedApplicationsQuery } from "./application.query";
import { Typography } from "antd";
import timeSince from "../../../shared/utilities/time-since";

export function _BackOfficeApplications() {
  const { data: applications, isLoading, isError, isFetching } = 
  useGetSubmittedApplicationsQuery();
 const navigate=useNavigate()
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/_applications/detail/${row?.original.id}`);
  };
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'applicationType',
        header: 'Application Type',
      },
      {
        accessorKey: 'applicationCategory',
        header: ' Application Category',
      },
      {
        accessorKey: 'applierType',
        header: ' Applier Type',
      },
      {
        accessorKey: 'comment',
        header: ' Comment',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      }, {
        accessorKey: 'createdAt',
        header: ' Applied At',
        accessorFn: (originalRow) => (
          <Typography>
            {timeSince(originalRow?.createdAt)}
          </Typography>
        ),
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

      
  
