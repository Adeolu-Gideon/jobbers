import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAllJobsContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";

const PageBtn = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    console.log(currentPage, pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    console.log(searchParams.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <div className="flex items-center justify-center mt-5 border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl">
      <button
        href="#"
        className="relative mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <span className="sr-only">Previous</span>
        <HiChevronDoubleLeft className="h-4 w-4" aria-hidden="true" /> Previous
      </button>
      {pages.map((pageNumber) => {
        return (
          <button
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-primary hover:text-white focus:z-20 focus:outline-offset-0 ${
              pageNumber === currentPage ?
              "relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : ""
            }`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        href="#"
        className="relative ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <span className="sr-only">Next</span>
        Next
        <HiChevronDoubleRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};
export default PageBtn;
