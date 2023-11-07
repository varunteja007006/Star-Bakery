/* eslint-disable react/prop-types */
function CustomCollapse({ label, children }) {
  return (
    <div className="collapse my-5 border border-purple-300 shadow-md">
      <input type="checkbox" />
      <div className="collapse-title bg-purple-300 text-xl font-medium shadow-sm">
        {label}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}

export default CustomCollapse;
