/* eslint-disable react/prop-types */

// Custom stats card
function CustomStats({ value, label, description, customClass }) {
  return (
    <div className={`stats shadow ${customClass ? "" : "bg-sky-300 dark:text-black"}`}>
      <div className="stat">
        {label && <div className="stat-title text-black">{label}</div>}

        {value && <div className="stat-value">{value}</div>}

        {description && <div className="stat-desc">{description}</div>}
      </div>
    </div>
  );
}

export default CustomStats;
