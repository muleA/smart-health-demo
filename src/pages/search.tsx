import { Button, Card, Spin, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLazyGetLicenseByIdQuery } from "../components/portal.query";
import useDebounce from "../shared/utilities/use-debounce";
import Empty from "../shared/empty-state";
import moment from "moment";

function SearchLicensee() {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const[triggerSearch,{data:searchResult,isLoading}]=useLazyGetLicenseByIdQuery()
   useEffect(()=>{
 triggerSearch(debouncedSearchTerm)
   },[debouncedSearchTerm, triggerSearch])

   const handleSearch = () => {
    triggerSearch(debouncedSearchTerm)

   }
   
   

   const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "ValidTo",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (text: moment.MomentInput) => moment(text).format("YYYY-MM-DD"),

    },
    {
      title: "ValidTo",
      dataIndex: "validTo",
      key: "validTo",
      render: (text: moment.MomentInput) => moment(text).format("YYYY-MM-DD"),

    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg m-8">
    
        <div className="flex flex-col bg-white p-4 rounded gap-2">
          <div className="text-2xl font-bold text-primary-400 ">Search</div>
          <p>
            <Typography>
              To perform a license look-up for an individual or business, please
              provide the required information below and click on the 'Search'
              button. The requested information will be displayed at the bottom
              of the screen. You can access the record of an individual or
              business by clicking on the provided link for each record.
            </Typography>
            <hr style={{ margin: "5px 0px 15px 0px " }} />
          </p>
          <div className="flex flex-col gap-4">
          
            <div className="w-100 flex">
              <div className="relative w-3/4 mx-auto flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-primary-500 dark:text-primary-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchInputChange}
                  className="bg-primary-50 border border-primary-400 text-primary-900 text-sm rounded-lg focus:ring-primary-500
          focus:border-primary-500 block w-full pl-10 p-2.5"
                  placeholder="search licensee/holder by license id"
                  required
                />
             <Button
              onClick={handleSearch}
                type="primary"
                className=" ml-2 h-10 text-sm font-medium text-white bg-primary-700
                 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 
                 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 
                 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
         
                Search
              </Button> 
              </div>
        
            </div>
          </div>
        </div>
    
      <Card>
        {searchResult?(<>
          <Table dataSource={searchResult?[searchResult]:[]} columns={columns} loading={isLoading}  />

        </>):null}
      </Card>

    </div>
  );
}

export default SearchLicensee;
