/* eslint-disable react/prop-types */
function PageBody({ children, PageTitle }) {
  return (
    <div className=" container mt-5">
      <h1 className="text-2xl mb-3"> {PageTitle} </h1>
      {children}
    </div>
  );
}

export default PageBody;
