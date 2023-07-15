import React, { useState } from 'react';
import { useDrag, DragSourceMonitor, DragSourceHookSpec } from 'react-dnd';

interface FormInputType {
  label: string;
  type: string;
}

interface FormInputProps extends FormInputType {
  onEditLabel: (label: string) => void;
  onEditType: (type: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, onEditLabel, onEditType }) => {
/*  const [{ isDragging }, drag] = useDrag<any, any, { isDragging: boolean }>({
  item: { label, type, isFormInput: true },
  collect: (monitor: DragSourceMonitor) => ({
 isDragging: monitor.isDragging(),
  }),
}); */  
  return (
 <div
  /*  ref={drag}
className={`p-2 mb-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-200 ${
  isDragging ? 'opacity-50' : ''
}`} */
 >
<div className="flex justify-between">
  <div>{label}</div>
  <button
 onClick={() => onEditLabel(label)}
 className="text-blue-500 underline focus:outline-none"
  >
 Edit
  </button>
</div>
<div className="flex justify-between">
  <div>{type}</div>
  <button
 onClick={() => onEditType(type)}
 className="text-blue-500 underline focus:outline-none"
  >
 Edit
  </button>
</div>
 </div>
  );
};

export const FormBuilder=():any => {
  const formInputTypes: FormInputType[] = [
 { label: 'Text Input', type: 'text' },
 { label: 'Textarea', type: 'textarea' },
 { label: 'Select Dropdown', type: 'select' },
 { label: 'Radio Buttons', type: 'radio' },
 { label: 'Checkboxes', type: 'checkbox' },
 { label: 'Date Picker', type: 'date' },
 { label: 'File Upload', type: 'file' },
 { label: 'Number Input', type: 'number' },
 { label: 'Email Input', type: 'email' },
 { label: 'Password Input', type: 'password' },
 { label: 'Range Slider', type: 'range' },
 { label: 'URL Input', type: 'url' },
 { label: 'Telephone Input', type: 'tel' },
 { label: 'Color Picker', type: 'color' },
 { label: 'Time Input', type: 'time' },
 { label: 'Week Input', type: 'week' },
 { label: 'Month Input', type: 'month' },
 { label: 'Search Input', type: 'search' },
 { label: 'Hidden Input', type: 'hidden' },
 { label: 'Submit Button', type: 'submit' },
  ];

  const [selectedInput, setSelectedInput] = useState<FormInputType | null>(null);

  const handleEditLabel = (label: string) => {
 const selected = formInputTypes.find((input) => input.label === label);
 if (selected) {
setSelectedInput(selected);
 }
  };

  const handleEditType = (type: string) => {
 const selected = formInputTypes.find((input) => input.type === type);
 if (selected) {
setSelectedInput(selected);
 }

return(<>
<div className="flex">
<div className="w-1/4 p-4 bg-gray-100">
  <h2 className="text-lg font-bold mb-4">Form Input Types</h2>
  {formInputTypes.map((inputType, index) => (
 <FormInput
key={index}
label={inputType.label}
type={inputType.type}
onEditLabel={handleEditLabel}
onEditType={handleEditType}
 />
  ))}
</div>
<div className="w-3/4 p-4 bg-white">
  {selectedInput && (
 <div>
<h3 className="text-lg font-bold">Edit Form Input</h3>
<div>
  <label htmlFor="editLabel" className="block font-medium mb-1">
 Label:
  </label>
  <input
 type="text"
 id="editLabel"
 value={selectedInput.label}
 onChange={(e) => {
setSelectedInput({ ...selectedInput, label: e.target.value });
 }}
 className="border border-gray-300 px-2 py-1 mb-2 rounded"
  />
</div>
<div>
  <label htmlFor="editType" className="block font-medium mb-1">
 Type:
  </label>
  <input
 type="text"
 id="editType"
 value={selectedInput.type}
 onChange={(e) => {
setSelectedInput({ ...selectedInput, type: e.target.value });
 }}
 className="border border-gray-300 px-2 py-1 mb-2 rounded"
  />
</div>
<button
  onClick={() => {
 // Handle the update logic for the selected input type
 console.log('Updated Form Input:', selectedInput);
 setSelectedInput(null);
  }}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
  Save
</button>
 </div>
  )}
</div>
 </div>
</>)}}
 



