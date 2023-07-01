import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../shared/default-page";
import { useGetLicenseQuery } from "./license.query";
import Typography from "antd/es/typography/Typography";
import StatusIndicator from "../../../shared/status-indicator";

export function License() {
  const navigate = useNavigate();
  const { data: license, isLoading, isSuccess, isError, isFetching } = useGetLicenseQuery();
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/licenses/detail/${row?.original.id}`);
  };

 

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      
      {
        accessorKey: 'licenseNumber',
        header: ' License Number',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.licenseNumber?.slice(0, 10))}
          </Typography>
        ),
      },
      {
        accessorKey: 'validFrom',
        header: 'Valid From',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.validFrom?.slice(0, 10))}
          </Typography>
        ),
      },
      {
        accessorKey: 'validTo',
        header: ' Valid To',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.validTo?.slice(0, 10))}
          </Typography>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        render: (originalRow:any) => (
          <span
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <StatusIndicator
              text={originalRow?.status}
              color={originalRow?.status === "APPROVED" ? "success.main" : "warning.main"}
            />
            {!originalRow.status && <>-</>}
          </span>
        ),
      },
      {
        accessorKey: 'comment',
        header: 'comment',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.comment?.slice(0, 10))}
          </Typography>
        ),
      },
     
    ],
    []
  );

  return (
    <>
 <DefaultPage title={"license"} backButtonLink="/license"   >
  <div>
  <MaterialReactTable
        columns={columns}
        data={license ?? []}
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

      
  
