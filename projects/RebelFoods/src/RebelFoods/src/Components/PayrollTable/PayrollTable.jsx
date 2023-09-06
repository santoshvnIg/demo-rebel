import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./payrollTable.scss";
import FileUpload from "../../Model/FileUpload";
import SkeletonTable from "../../Common/SkeletonTable";
import Pagination from "../Pagination/Pagination";
import { DataService } from "../../Services/Dataservice";
import { toast } from "react-toastify";

function PayrollTable() {
  const [payrollData, setPayrollData] = useState(null);
  const [show, setShow] = useState(false);
  const [maincheck, setMaincheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [apichange, Setapichange] = useState(true);
  const [searial, setSerial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleupload = () => {
    setShow(true);
  };

  const handlePrevClick = () => {
    if (page - 1 > 0) setPage((prevPage) => prevPage - 1);
    return null;
  };

  const handleNextClick = () => {
    if (page + 1 <= payrollData?.last_page) setPage((prevPage) => prevPage + 1);
    return null;
  };

  const handlePageClick = (e) => {
    setPage(parseInt(e.target.innerText, 10));
  };

  //pay-roll listing Api call

  const payrollApi = (token, page) => {
    setIsLoading(true);
    const payrollData = DataService.PayRollList(token, page);

    toast
      .promise(payrollData, {
        pending: "Waiting for the respose",
      })

      .then((res) => {
        if (res) {
          setLoading(false);
          setPayrollData(res?.data?.data);
          setSerial(res?.data?.data?.from);
          if (res?.data?.data?.current_page > 1) {
            toast.success("Updated successfully");
          }
        } else {
          toast.error("Somthing went wrong");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          toast.error(error?.message);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    payrollApi(token, page);
  }, [page, apichange]);

  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="main " id="payrolltable">
            <div className="d-flex flex-row-reverse">
              <p className="addFunds" onClick={handleupload}>
                + Add Funds
              </p>
            </div>
            <div className="d-flex ">
              {maincheck && (
                <Button
                  variant="danger"
                  style={{ height: "2rem", width: "9rem", fontSize: "12px" }}
                >
                  Delete Selected
                </Button>
              )}
            </div>
            <div
              className={`overflow-auto ${
                payrollData?.data?.length < 1
                  ? "table-height"
                  : "table-height-auto"
              } `}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Date</th>
                    <th>Uploaded By</th>
                    <th>Status</th>
                    <th>File Name</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData?.data?.map((element, index) => {
                    return (
                      <tr>
                        <td>{searial + index}</td>
                        <td style={{ textAlign: "left !important" }}>
                          {element?.added_on}
                        </td>
                        <td>
                          {element?.get_user_name?.firstname}{" "}
                          {element?.get_user_name?.lastname}
                        </td>
                        <td>
                          {element?.status == "1" ? "Processed" : "Processing"}
                        </td>
                        <td>{element?.queue_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                data={payrollData}
                page={page}
                handlePageClick={handlePageClick}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                isLoading={isLoading}
              />
            </div>
            <FileUpload
              show={show}
              setShow={setShow}
              Setapichange={Setapichange}
              apichange={apichange}
            />
          </div>
        </>
      )}
    </>
  );
}

export default PayrollTable;
