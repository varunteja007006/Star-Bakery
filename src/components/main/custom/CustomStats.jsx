/* eslint-disable react/prop-types */

// Custom stats card
function CustomStats({ value, label, description }) {
  return (
    <div className="stats bg-purple-300 shadow">
      <div className="stat">
        {label && <div className="stat-title">{label}</div>}

        {value && <div className="stat-value">{value}</div>}

        {description && <div className="stat-desc">{description}</div>}
      </div>
    </div>
  );
}

export default CustomStats;
