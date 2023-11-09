/* eslint-disable react/prop-types */

// Custom accordian
function CustomCollapse({ label, children, customClass }) {
  return (
    <div
      className={`collapse my-5 border border-sky-300 shadow-md ${customClass}`}
    >
      <input type="checkbox" />
      <div className="collapse-title bg-sky-300 text-xl font-medium shadow-sm">
        {label}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}

export default CustomCollapse;
