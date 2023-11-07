/* eslint-disable react/prop-types */

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
        className="input input-bordered w-full max-w-xs"
        onChange={handleFunction}
      />
    </div>
  );
}

export default CustomTextInput;
