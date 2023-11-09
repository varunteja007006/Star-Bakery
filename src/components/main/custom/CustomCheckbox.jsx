/* eslint-disable react/prop-types */

// Custom check box for using in multiple forms
function CustomCheckbox({ label, handleFunction, value, customCSS }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          className={`toggle ${customCSS} `}
          onClick={handleFunction}
          checked={value}
        />
      </label>
    </div>
  );
}

export default CustomCheckbox;
