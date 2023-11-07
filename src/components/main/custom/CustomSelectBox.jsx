/* eslint-disable react/prop-types */
function CustomSelectBox({ label, options, name, id }) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-lg capitalize">{label}</span>
      </label>
      <select name={name} id={id} className="select select-bordered capitalize">
        <option value={""}>None</option>
        {options &&
          options.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default CustomSelectBox;
