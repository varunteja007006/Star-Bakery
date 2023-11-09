/* eslint-disable react/prop-types */

import Datepicker from "react-tailwindcss-datepicker";
function CustomDatePicker({ label, value, handleValueChange }) {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text text-lg capitalize">{label}</span>
        </label>
      )}
      <Datepicker
        primaryColor={"purple"}
        value={value}
        onChange={handleValueChange}
        separator={"to"}
        // asSingle={true}
        useRange={false}
        // showShortcuts={true}
      />
    </div>
  );
}

export default CustomDatePicker;
