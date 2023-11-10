/* eslint-disable react/prop-types */

import { useState } from "react";

// Custom select input field for using in multiple forms
function CustomSelectBox({ label, options, name, id, value }) {
  const [defaultValue, setdefaultValue] = useState(value);

  const handleValueChange = (e) => {
    setdefaultValue(e.target.value);
  };

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-lg capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={id}
        value={defaultValue}
        className="select select-bordered capitalize"
        onChange={handleValueChange}
      >
        <option value={""}>None</option>
        {options?.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </div>
  );
}

export default CustomSelectBox;
