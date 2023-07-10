import { ReactFlowProvider } from "reactflow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DnDFlow from "./sidebar-wrapper";

export default function WorkFlowPage() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ReactFlowProvider>
          <DnDFlow />
        </ReactFlowProvider>
      </DndProvider>
    </>
  );
}
