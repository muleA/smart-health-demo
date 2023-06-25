import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleCard from '../../../shared/card';
import { Button, Card, Form, Modal, Select, message } from 'antd';
import { useArchiveLicenseMutation, useChangeStatusMutation, useGetLicenseByIdQuery } from './license.query';
import { useLazyGetLicenseByApplicationIdQuery } from '../../portal/Home/home-query';
import { useLazyGetUserByIdQuery } from '../../back-office.query';
function DetailLicense() {
  const {id}= useParams();
  const { Option } = Select;

  const {data:licenseInfo,isLoading}=useGetLicenseByIdQuery(id as string)
  console.log("licenseInfo",licenseInfo)
  const[archive,{isLoading:archiving}]=useArchiveLicenseMutation()
     const handleArchive=async ()=>{
      try{
      await archive(id?.toString())
      }catch(err){
console.log(err)
      }
     }
     const [isModalVisible, setIsModalVisible] = useState(false);

     const handleApproveClick = () => {
       setIsModalVisible(true);
     };
     
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
 const handleChangeStatus=async (values: any)=>{
  console.log("values",values)
      try{
      await changeStatus({userId:id?.toString(),status:values?.status})
            
      setIsModalVisible(false);
      message.success("Approved successfully");
      }catch(err){
        message.error("error");

console.log(err)
      }
     }      
     

     const[trigger,{data:appInfo,isLoading:appInfoLoading}]=useLazyGetLicenseByApplicationIdQuery()
     const[triggerUserInfo,{data:userInfo,isLoading:userInfoLoading}]=useLazyGetUserByIdQuery()
     const[changeStatus,{isLoading:changing}]=useChangeStatusMutation()
     console.log("appInfo",appInfo)
     useEffect(()=>{
       if(licenseInfo){
         trigger(licenseInfo?.applicationId)
       }
     },[licenseInfo, trigger])
     useEffect(()=>{
       if(licenseInfo){
         triggerUserInfo(licenseInfo?.userId)
       }
     },[licenseInfo, triggerUserInfo])


    
  return (
    <><CollapsibleCard title={"License Information's"} loading={isLoading}>
      <Card className='flex space-x-16'>

      <div className="card-body mb-10">
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <tbody>
        <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">License Holder</td>
            <td className="px-8 py-2">{userInfo?.firstName} {''} {userInfo?.middleName} {''} {userInfo?.lastName}</td>
          </tr>
        <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">License Category</td>
            <td className="px-8 py-2">{appInfo?.applicationCategory}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">Comment</td>
            <td className="px-8 py-2">{appInfo?.comment}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">License Category</td>
            <td className="px-8 py-2">{appInfo?.applicationCategory}</td>
          </tr>
        <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">Expired  At</td>
            <td className="px-8 py-2">{licenseInfo?.validTo}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 font-bold">Issued At</td>
            <td className="px-8 py-2">{licenseInfo?.validFrom}</td>
          </tr>
         
    
        
    
        </tbody>
      </table>
    </div>
  </div>
       <Button className='bg-primary text-white' onClick={handleApproveClick} >Change Status</Button>
       <Button type='primary' loading={archiving} onClick={handleArchive} className='bg-red-400 ml-10  text-white'>Archive</Button>
      </Card>
    </CollapsibleCard>
    <Modal
            title="Change Status"
            visible={isModalVisible}
            onOk={handleChangeStatus}
            onCancel={handleModalCancel}
            footer={null} // Remove the footer
          >
            <Form onFinish={handleChangeStatus}>
            <Form.Item label="Status" name="status">
        <Select>
          <Option value="SUSPENDED">SUSPENDED</Option>
          <Option value="ACTIVE">ACTIVE</Option>
          <Option value="EXPIRED">EXPIRED</Option>
        </Select>
      </Form.Item>


              <Form.Item>
                <Button
                  type="primary"
                  className="bg-primary text-white"
                  htmlType="submit"
                  loading={changing}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
      </>
  );
}

export default DetailLicense;
