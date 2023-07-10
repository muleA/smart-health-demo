import { Add } from "@mui/icons-material";
import { Button, Form, Input, Modal, Spin, Typography, message } from "antd";
import React, { useState } from "react";
import { useCreateTaskMutation, useGetTasksQuery } from "../../back-office.query";
import Empty from "../../../shared/empty-state";

export const SideBar = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
const[createTask,{isLoading:creating}]=useCreateTaskMutation()
  const taskList = [
    { type: "start", label: "Start Application" },
    { type: "document", label: "Gather Required Documents" },
    { type: "payment", label: "Make Payment" },
    { type: "review", label: "Application Review" },
    { type: "verification", label: "Verify Information" },
    { type: "assessment", label: "Assessment and Evaluation" },
    { type: "decision", label: "Decision Making" },
    { type: "issue", label: "License Issuance" },
    { type: "end", label: "End Application" },
  ];

  const{data:tasks,isLoading}=useGetTasksQuery()
  const handleAddTaskModal = async (values: any) => {
    console.log("values ", values);
    try {
      // Call API using Axios
      await createTask({
        taskname: values?.description,
        description: "string",
        basline: "string",
        metric: "string",
        requireUserInput: "string",
        taskGroupID: "string",
        taskAssignmentOption: "string",
        isPullable: "string",
        taskHandlerType: "string",
        isInWorkFlow: true,
        stage: true,
        serviceDetailId: true,
      });
      message.success("Task Added successfully");
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  return (
    <>
      <aside>
        <div className="flex items-center space-x-16  border-b mb-4 bg-gray-100">
          <Typography className="font-bold  p-2 3xl text-xl text-primary underline">
            Tasks
          </Typography>
          <Button
            className=" text-white bg-primary"
            onClick={() => setAddTaskModalVisible(true)}
            icon={<Add />}
          >
            Task
          </Button>
        </div>
        {isLoading?(<>
        <Spin/>
        </>):(<>
          {tasks?.map((node:any) => (
          <div 
            key={node.id}
            className={`dndnode ${node.taskname}`}
            onDragStart={(event) => onDragStart(event, node.taskname)}
            draggable
          >
            {node.taskname}
          </div>
        ))}
        {!tasks && <Empty/>}
        </>)}

        
       
      </aside>
      <Modal
        title="Add Tasks"
        visible={addTaskModalVisible}
        onOk={handleAddTaskModal}
        onCancel={() => setAddTaskModalVisible(false)}
        footer={null} // Remove the footer
      >
        <Form onFinish={handleAddTaskModal}>
          <Form.Item label="Task Name" name="description">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="bg-primary text-white"
              htmlType="submit"
              loading={creating}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
