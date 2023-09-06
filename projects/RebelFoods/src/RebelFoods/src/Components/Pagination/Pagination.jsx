import React from "react";
import "./pagination.scss";

const Pagination = ({
  data,
  page,
  handlePageClick,
  handlePrevClick,
  handleNextClick,
  isLoading,
}) => {
  
  return (
    <div>
      {data && data?.data?.length ? (
        <div className="pager pt-30px px-3">
          <nav aria-label="Page navigation   EmployeeModel">
            <ul className="pagination generic-pagination pr-1">
              {page > 1 ? (
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    aria-label="Previous"
                    onClick={handlePrevClick}
                  >
                    <span aria-hidden="true">
                      <i className="la la-arrow-left" />
                    </span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              ) : null}
              <li className="page-item active">
                <button
                  type="button"
                  className="page-link"
                  onClick={handlePageClick}
                  disabled={isLoading}
                >
                  {page}
                </button>
              </li>

              {page + 1 <= data.last_page && (
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={handlePageClick}
                    disabled={isLoading}
                  >
                    {page + 1}
                  </button>
                </li>
              )}
              {page + 2 <= data.last_page && (
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={handlePageClick}
                    disabled={isLoading}
                  >
                    {page + 2}
                  </button>
                </li>
              )}
              {page + 3 <= data.last_page && (
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={handlePageClick}
                    disabled={isLoading}
                  >
                    {page + 3}
                  </button>
                </li>
              )}
              {page !== data.data.last_page ? (
                <li className="page-item">
                  <button
                    type="button"
                    onClick={handleNextClick}
                    disabled={isLoading}
                    className="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">
                      <i className="la la-arrow-right" />
                    </span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
          <p className="fs-13 pt-2">
            Showing {data.from}-{data.to} results of {data.total}{" "}
          </p>
        </div>
      ) : (
        <div style={{ textAlign: " center !important" }}>
        
          <h3
            className="fs-22 fw-medium"
            style={{ textAlign: " center !important" }}
          >
            No Results!!
          </h3>
         
        </div>
      )}
    </div>
  );
};

export default Pagination;
