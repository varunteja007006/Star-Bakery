/* eslint-disable react/prop-types */

// Custom text input field for using in multiple forms
function CustomTextInput({
  label,
  placeholder,
  handleFunction,
  value,
  name,
  id,
}) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-lg capitalize">{label}</span>
      </label>
      <input
        name={name}
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        className="input input-bordered w-full max-w-xs dark:bg-white"
        onChange={handleFunction}
      />
    </div>
  );
}

export default CustomTextInput;
