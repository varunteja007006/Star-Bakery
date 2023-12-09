/* eslint-disable react/prop-types */

// custom date picker widget
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
        primaryColor={"yellow"}
        value={value}
        onChange={handleValueChange}
        separator={"to"}
        useRange={false}
      />
    </div>
  );
}

export default CustomDatePicker;
