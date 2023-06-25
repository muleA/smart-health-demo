import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../shared/default-page";
import { useGetLicenseQuery } from "./license.query";
import Typography from "antd/es/typography/Typography";
import { Badge } from "antd";

export function License() {
  const navigate = useNavigate();
  const { data: license, isLoading, isSuccess, isError, isFetching } = useGetLicenseQuery();
  const handleRowClick = (row: any) => {
    console.log("row",row)
    navigate(`/license/detail/${row?.original.id}`);
  };

 

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'comment',
        header: ' comment',
      },
      {
        accessorKey: 'validFrom',
        header: ' validFrom',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.validFrom?.slice(0, 10))}
          </Typography>
        ),
      },
      {
        accessorKey: 'validTo',
        header: ' validTo',
        accessorFn: (originalRow) => (
          <Typography>
            {(originalRow?.validTo?.slice(0, 10))}
          </Typography>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: (status) => (status ? 'Active' : 'Inactive'),
        accessorFn: (originalRow) => (
          <Typography>
            {originalRow?.status==="Active" ? (
              <Badge color="green" status="success" text="Active" />
            ) :originalRow?.status==="SUSPENDED"? (
              <Badge color="red" text="S" />
            ):(
              <Badge color="yellow" text="Expired" />

            )}
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

      
  
