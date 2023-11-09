/* eslint-disable react/prop-types */

// Custom button for using as different buttons
function CustomButton({
  btnBGColor,
  customClass,
  label,
  type,
  handleFunction,
}) {
  return (
    <button type={type} onClick={handleFunction} className={`btn my-5 ${btnBGColor} ${customClass}`}>
      {label}
    </button>
  );
}

export default CustomButton;
