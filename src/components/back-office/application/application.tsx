import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_ColumnDef } from "material-react-table";
import { DefaultPage } from "../../../shared/default-page";
import { useGetApplicationsQuery } from "./application.query";
import { Typography } from "antd";
import timeSince from "../../../shared/utilities/time-since";
import StatusIndicator from "../../../shared/status-indicator";
import { Box } from "@mui/material";
import {useNavigate} from 'react-router-dom'
export function BackOfficeApplications() {
  const {
    data: applications,
    isLoading,
    isError,
    isFetching,
  } = useGetApplicationsQuery();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "applicationType",
        header: "Application Type",
      },
      {
        accessorKey: "applicationCategory",
        header: " Application Category",
      },
      {
        accessorKey: "applierType",
        header: " Applier Type",
      },
      {
        accessorKey: "comment",
        header: " Comment",
      },
      {
        accessorKey: "createdAt",
        header: " Applied At",
        accessorFn: (originalRow) => (
          <Typography>{timeSince(originalRow?.createdAt)}</Typography>
        ),
      },

      {
        header: "Status",
        accessorKey: "status",
        key: "status",
        accessorFn(originalRow) {
          return (
            <Box display="flex" gap={1} alignItems="center">
              <StatusIndicator
                text={originalRow?.status}
                color={
                  originalRow.status === "SUBMITED"
                    ? "warning.main"
                    : originalRow.status === "REJECTED"
                    ? "error.main"
                    : "success.main"
                }
              />
            </Box>
          );
        },
      },
    ],
    []
  );
  const navigate = useNavigate();
  const handleRowClick = (row: any) => {
    console.log("row", row);
    navigate(`/_applications/detail/${row?.original.id}`);
  };
  return (
    <>
      <DefaultPage title={""} backButtonLink="/license">
       
        <MaterialReactTable
          columns={columns}
          data={applications ?? []}
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
      </DefaultPage>
    </>
  );
}
