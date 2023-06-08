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
 <DefaultPage title={"license"} backButtonLink="/license"   primaryButtonProps={{
      children: "New",
      onClick: () => {
        navigate("/license/new")
      },
    }} >
  <div style={{width:"1200px"}}>
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

      
  