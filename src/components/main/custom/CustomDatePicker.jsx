import { useState } from "react";

function CustomDatePicker() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return <div></div>;
}

export default CustomDatePicker;
