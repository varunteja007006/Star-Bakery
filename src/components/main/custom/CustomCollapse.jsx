/* eslint-disable react/prop-types */

import { useState } from "react";

// Custom accordian/collapse
function CustomCollapse({ label, children, customClass }) {
  const [showContent, setShowContent] = useState(true);

  return (
    <>
      {/* mine */}
      <div
        className={`collapse collapse-arrow my-5 border border-sky-300 shadow-md ${customClass} ${
          showContent ? "collapse-open" : "collapse-close"
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            setShowContent(!showContent);
          }}
        />
        <div className="collapse-title bg-sky-300 text-xl font-medium shadow-sm">
          {label}
        </div>
        <div className="collapse-content">{children}</div>
      </div>
    </>
  );
}

export default CustomCollapse;
