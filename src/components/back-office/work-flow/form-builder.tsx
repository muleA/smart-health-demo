import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface FormBuilderProps {
  id: string;
  label: string;
  type: string;
  onLabelChange: (id: string, label: string) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  id,
  label,
  type,
  onLabelChange
}) => {
 

  const [editableLabel, setEditableLabel] = useState(label);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableLabel(e.target.value);
    onLabelChange(id, e.target.value);
  };

  const renderInput = () => {
    switch (type) {
      case "text":
        return <input type="text" className="border p-1" />;
      case "number":
        return <input type="number" className="border p-1" />;
      case "date":
        return <input type="date" className="border p-1" />;
      case "file":
        return <input type="file" className="border p-1" />;
      case "multiselect":
        return (
          <select multiple className="border p-1">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      case "checkbox":
        return <input type="checkbox" />;
      case "radio":
        return (
          <div>
            <label className="mr-2">
              <input type="radio" name="option" value="option1" />
              Option 1
            </label>
            <label className="mr-2">
              <input type="radio" name="option" value="option2" />
              Option 2
            </label>
            <label className="mr-2">
              <input type="radio" name="option" value="option3" />
              Option 3
            </label>
          </div>
        );
      case "textarea":
        return <textarea className="border p-1" />;
      default:
        return null;
    }
  };

  return (
    <div
    >
      <label className="flex items-center mb-2">
        <span className="mr-2">Label:</span>
        <input
          type="text"
          value={editableLabel}
          onChange={handleLabelChange}
          className="border p-1"
        />
      </label>
      {renderInput()}
    </div>
  );
};

export default FormBuilder;
