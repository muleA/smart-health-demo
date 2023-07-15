import { Button, Form, Input } from "antd"
import RegistrationForm from "./registration-form"

export const Registration=()=>{
 return(<>
 <div className="flex min-h-screen justify-center bg-sky-10 p-8">
<div className="h-fit-content mb-10 w-full bg-white md:w-10/12">
  <div className="mt-4 mb-4 flex w-full items-center justify-center text-xl font-medium text-gray-600">
 User registration
  </div>
  <div className="mb-2 flex w-full bg-white">
 <div className="hidden  w-1/2 p-6 text-white md:block">
  <img src="/4962879.jpg" alt="registration"/>
 </div>
 <div className="flex w-full flex-col space-y-5 px-2 md:w-1/2 md:px-8">
<RegistrationForm/>
 </div>
  </div>
</div>
 </div>
 </>)
}


