/* import Slider from 'react-slick';
 */ import { useAuth } from "../shared/auth/use-auth";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import Report from "./report";
import { t } from "i18next";
import { BannerSvg } from "./banner-svg";
import { ApprovedSVG } from "./approved-svg";
import { VisitorSVG } from "./total-visitor-svg";
import { TotalSVG } from "./total-user";
import { AvailableLicense } from "./available-license";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Carousel({
  approvedLicense,
  approvedLicenseLoading,
  isLoading,
}: any) {
  const { session } = useAuth();
  const[applications,setApplications]=useState([])
  const[license,setLicense]=useState([])
const[users,setUsers]=useState([])
useEffect(() => {
  axios.get('http://20.21.120.66:3000/api/user/get-applications')
    .then(response => {
      // Handle the successful response here
      console.log(response.data);
      setApplications(response?.data);
    })
    .catch(error => {
      // Handle the error here
      console.error(error);
    });

  axios.get('http://20.21.120.66:3000/api/user/get-users')
    .then(response => {
      // Handle the successful response here
      console.log(response.data);
      setUsers(response?.data);
    })
    .catch(error => {
      // Handle the error here
      console.error(error);
    });

  axios.get('http://20.21.120.66:3000/api/user/get-licenses')
    .then(response => {
      // Handle the successful response here
      console.log(response.data);
      setLicense(response?.data);
    })
    .catch(error => {
      // Handle the error here
      console.error(error);
    });
}, []); 

  return (
    <>
     <Card className="bg-gray-100">
  {!session && (
    <div className="relative mb-2 hidden w-full mx-auto bg-gradient-to-l from-sky-100 to-sky-50 md:block">
      <div className="mx-8">
        <div className="flex w-full items-start justify-between">
          <div className="mt-6 w-full md:w-6/12 items-center">
            <div style={{ fontFamily: "Raleway" }}>
              <p className="my-6 text-center text-2xl font-semibold leading-normal text-sky-700 md:text-left md:text-2xl lg:text-left lg:text-3xl">
                Welcome to Smart Health License Management System
              </p>
              <p className="my-4 text-center font-normal tracking-normal text-gray-500 md:text-left md:text-lg mr-4">
                The Smart Health License Management System is a comprehensive
                platform designed to streamline and simplify the management of
                professional licenses in the healthcare industry. Whether you
                are a healthcare provider, an administrator, or a licensing
                authority, our system provides you with powerful tools to
                efficiently handle license applications, renewals,
                verifications, and more.
              </p>
              <div className="flex space-x-2 mb-4">
              </div>
            </div>
          </div>
          <div className="mx-4 mt-6 flex w-full md:w-6/12 items-center justify-end">
            <BannerSvg />
          </div>
        </div>
      </div>
    </div>
  )}

  {approvedLicenseLoading || isLoading ? (
    <Spin size="default" />
  ) : (
    <>
      {!session && (
        <div className="mt-8 mb-8 grid w-full space-x-8  mx-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-1 py-2 pr-2 text-sm">
          <Report
            className="group ml-2 min-w-full self-center rounded-tl-lg bg-primary px-3 md:ml-0 md:min-w-fit md:bg-white lg:rounded-lg lg:hover:bg-primary lg:hover:shadow-2xl lg:hover:shadow-primary"
            icon={<ApprovedSVG />}
            number={users?.length}
            text="Portal visitors"
          />

          <Report
            className="group ml-2 min-w-full self-center bg-primary px-3 md:bg-white lg:ml-0 lg:min-w-fit lg:rounded-lg lg:hover:bg-primary lg:hover:shadow-2xl lg:hover:shadow-primary"
            icon={<AvailableLicense />}
            number={license?.length}
            text="Available Licenses"
          />

          <Report
            className="group ml-2 min-w-full self-center rounded-br-lg bg-primary px-3 md:bg-white lg:ml-0 lg:min-w-fit lg:rounded-lg lg:hover:bg-primary lg:hover:shadow-2xl lg:hover:shadow-primary"
            icon={<VisitorSVG />}
            number={applications?.length}
            text="Processed  Applications"
          />

          <Report
            className="group ml-2 min-w-full self-center rounded-bl-lg bg-primary px-3 md:bg-white lg:ml-0 lg:min-w-fit lg:rounded-lg lg:hover:bg-primary lg:hover:shadow-2xl lg:hover:shadow-primary"
            icon={<TotalSVG />}
            number={users?.length}
            text="Registered Users"
          />
        </div>
      )}
    </>
  )}
</Card>

    </>
  );
}
