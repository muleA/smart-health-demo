import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './work-flow-style.css';
import { SideBar } from './work-flow-sidebar';
import { Button } from 'antd';
const initialEdges=[ {
  id: 'horizontal-e1-2',
  source: 'horizontal-1',
  type: 'smoothstep',
  target: 'horizontal-2',
  animated: true,
},
{
  id: 'horizontal-e1-3',
  source: 'horizontal-1',
  type: 'smoothstep',
  target: 'horizontal-3',
  animated: true,
}]
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'start' },
    position: { x: 250, y: 5 },
    style: {
      backgroundColor: 'green',
      borderRadius: '50%',
      color: 'white',
      width: '20px',
      height: '20px',
      borderColor: 'green',
      borderWidth: '2px',
      fontSize: '10px', // Adjust the font size
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'end' },
    position: { x: 250, y: 200 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 10,
      height: 10,
      color: '#FF0072',
    },
    label: 'marker size and color',
    style: {
      backgroundColor: 'red',
      strokeWidth: 2,
      stroke: '#FF0072',
      borderRadius: '50%',
      color: 'white',
      width: '20px',
      height: '20px',
      borderColor: 'red',
      borderWidth: '2px',
      fontSize: '10px', // Adjust the font size
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
];



let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper?.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      } as any);
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );


  return (
   

    <div className="dndflow">
      <ReactFlowProvider>
      <SideBar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
<div className="flex items-center justify-between mt-4 bg-gray-100 p-2">
        <div className="mx-8 md:flex space-x-2">
        </div>

        <div className="mx-8 md:flex space-x-2">
          {/* Save Button */}
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded">
            Save
          </Button>

          {/* Cancel Button */}
          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded">
            Cancel
          </Button>
        </div>
      </div>



{/*  */}
<div style={{ width: '65vw', height: '80vh',  
    border: "2px solid lightBlue",
    marginTop:"10px",
    borderRadius: "5px" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance as any}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
          <Controls />
          <Background />
          </ReactFlow>
          </div>

        </div>
      </ReactFlowProvider>

    </div>
  );
};

export default DnDFlow;
