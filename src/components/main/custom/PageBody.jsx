/* eslint-disable react/prop-types */

// Custom page to wrap pages for homogenous look
function PageBody({ children, PageTitle }) {
  return (
    <div className=" container mt-5 min-h-screen pb-10">
      {PageTitle && <h1 className="text-2xl mb-3"> {PageTitle} </h1>}
      {children}
    </div>
  );
}

export default PageBody;
