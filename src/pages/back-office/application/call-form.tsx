import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormBuilder } from "./form-builder3"
import { DndProvider } from "react-dnd"

export const CallFormBuilder=()=>{
 return(<>
  <DndProvider backend={HTML5Backend}>
<FormBuilder />
 </DndProvider>
 </>)
}