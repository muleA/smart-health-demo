import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table';
import { DefaultPage } from "../../../shared/default-page";
import { Role } from "../../../models/role";
import { useGetLicenseQuery } from "./license.query";

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
      },
      {
        accessorKey: 'validTo',
        header: ' validTo',
      },
      {
        accessorKey: 'status',
        header: ' status',
        Cell: (status) => (status ? 'True' : 'False'),
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

      
  
