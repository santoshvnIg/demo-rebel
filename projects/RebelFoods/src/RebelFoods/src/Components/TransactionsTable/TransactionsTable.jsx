import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./TransactionTable.scss";
import SkeletonTable from "../../Common/SkeletonTable";
import { DataService } from "../../Services/Dataservice";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-toastify";
import FileUpload from "../../Model/FileUpload";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import { saveAs } from "file-saver";

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function getOneMonthOldDate() {
  const today = new Date();
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );

  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, "0");
  const day = String(oneMonthAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function TransactionsTable() {
  const [maindata, setMaindata] = useState([]);
  const [transactions, setTransaction] = useState(null);
  const [searchvalue, SetSearchvalue] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [startDate, setStartDate] = useState(getOneMonthOldDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [togal, setTogal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  )
    .toISOString()
    .split("T")[0];

  // Donation listing Api call
  const DonationListApi = (token, page, data) => {
    setIsLoading(true);
    const DonationList = DataService.DonationList(token, page, data);

    toast
      .promise(
        DonationList,
        page != 1
          ? {
              pending: "Waiting for the respose",
            }
          : ""
      )
      .then((res) => {
        if (res?.data?.data?.current_page > 1) {
          toast.success("Updated successfully");
        }
        setTransaction(res?.data?.data);
        setMaindata(res?.data?.data?.data);
        setSerialNo(res?.data?.data?.from);
        setPage(res?.data?.data?.current_page);
        setLoading(false);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          toast.error("Somthing went wrong");
          setIsLoading(false);
        }
      });
  };

  // Donation search Api call
  const SearchPayRollList = (token, data) => {
    setIsLoading(true);
    const searchData = DataService.SearchPayRollList(token, data);

    toast
      .promise(searchData, {
        pending: "Waiting for the respose",
      })

      .then((res) => {
        setTransaction(res?.data?.data);

        setPage(res?.data?.data?.current_page);
        toast.success("Updated successfully");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          toast.error("Somthing went wrong");
          setIsLoading(false);
        }
      });
  };
  // Download 80G Api
  const pdfApi18g = (url, adress, pan, adress1) => {
    
    if (pan?.length < 10) {
      toast.info("Pan card details are not available.");
    } else if (adress.length == 0 && adress1.length == 0) {
      toast.info("Address details are not available.");
    } else if (url?.length < 4) {
      toast.info("Pdf Document not available");
    } else {
      const pdfApi = DataService.Download18G(token, url);
      toast
        .promise(pdfApi, {
          pending: "Waiting for the respose",
        })

        .then((res) => {
          if (res.status == 200) {
            downoladFile(res?.data?.pdfData, res?.data?.pdfName);
            toast.success(res?.data?.message);
          }
          toast.error(res?.message);
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  const handleFilterChange = (e) => {
    let searchInput = e.target.value;
    SetSearchvalue(searchInput);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleFilterClick = () => {
    const data = {
      filter: searchvalue,
      from: startDate,
      to: endDate,
    };

    if (togal === true) {
      SearchPayRollList(token, data);
    } else if (togal === false) {
      setEndDate(getCurrentDate());
      setStartDate(getOneMonthOldDate());
      SetSearchvalue("");
      SearchPayRollList(token, {
        page,
        filter: "",
        from: "",
        to: "",
      });
    }
    setTogal(!togal);
  };

  const handlePrevClick = () => {
    if (page - 1 > 0) setPage((prevPage) => prevPage - 1);
    return null;
  };

  const handleNextClick = () => {
    if (page + 1 <= transactions?.last_page)
      setPage((prevPage) => prevPage + 1);
    return null;
  };

  const handlePageClick = (e) => {
    setPage(parseInt(e.target.innerText, 10));
  };

  const handlePdfcall = (url, adress, pan, adress1) => {
    pdfApi18g(url, adress, pan, adress1);
  };
  const downoladFile = async (pdfData, pdfName) => {
    if (pdfData) {
      try {
        // Convert Base64 to binary data
        const binaryData = atob(pdfData);

        // Create a Uint8Array from the binary data
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: "application/pdf" });

        // Trigger the file download
        saveAs(blob, pdfName);
      } catch (error) {
        // console.error("Error downloading PDF:", error);
        toast.error("Error downloading PDF:");
      }
    }
  };

  useEffect(() => {
    
    DonationListApi(token, {
      page,
      filter: searchvalue,
      from: startDate,
      to: endDate,
    });
  }, [page]);

 
  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="main" id="transectiontable">
            <div className="web">
              <div className="d-flex ">
                <div style={{ paddingRight: "1rem" }}>
                  <input
                    type="date"
                    value={startDate}
                    min={minDate}
                    max={maxDate}
                    onChange={handleStartDateChange}
                    className="datestyle  "
                  />
                </div>
                <div
                  style={{ paddingRight: "1rem", height: "2.5rem !important" }}
                >
                  <input
                    type="date"
                    value={endDate}
                    min={minDate}
                    max={maxDate}
                    onChange={handleEndDateChange}
                    className="datestyle"
                  />
                </div>
                <InputGroup size="sm" className="mb-3">
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Search by Employee code"
                    style={{ background: "#F2F2F2" ,height:"40px" }}
                    onChange={handleFilterChange}
                    value={searchvalue}
                  />
                </InputGroup>
            
                <div>
                  <button
                    onClick={handleFilterClick}
                    className="filtername"
                    style={{ marginLeft: "1rem" }}
               
                  >
                    {togal ? "Apply Filter" : "Clear"}
                  </button>
                  
                </div>
              </div>
            </div>
            <div className="container mobile">
              <div className="row d-flex">
                <div style={{ paddingRight: "1rem" }}>
                  <input
                    type="date"
                    value={startDate}
                    min={minDate}
                    max={maxDate}
                    onChange={handleStartDateChange}
                    className="datestyle  "
                  />
                </div>
                <div style={{ paddingRight: "1rem" }}>
                  <input
                    type="date"
                    value={endDate}
                    min={minDate}
                    max={maxDate}
                    onChange={handleEndDateChange}
                    className="datestyle"
                  />
                </div>
              </div>
              <div className="row d-flex">
                <InputGroup
                  size="sm"
                  className="mb-3"
                  style={{
                    width: "3rem !important",
                    height: "2.5rem !important",
                  }}
                >
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Search by Employee Code"
                    style={{ background: "#F2F2F2" }}
                    onChange={handleFilterChange}
                    value={searchvalue}
                  />
                </InputGroup>

                <div>
                <button
                    onClick={handleFilterClick}
                    className="filtername"
                    style={{ marginLeft: "1rem" }}
               
                  >
                    {togal ? "Apply Filter" : "Clear"}
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex  justify-content-between"></div>
            <div
              className={`overflow-auto ${
                transactions?.data?.length < 5
                  ? "table-height"
                  : "table-height-auto"
              } `}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Date</th>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Transaction Id</th>
                    <th>Merchant Transaction</th>
                    <th>Status</th>
                    <th>Tax Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.data?.map((element, i) => {
                    return (
                      <tr>
                        <td className="align-items-center text-break">
                          {serialNo + i}
                        </td>
                        <td
                          className="align-items-center text-break"
                          style={{ textAlign: "start !important" }}
                        >
                          {element?.donationDate}
                        </td>
                        <td className="align-items-center text-break">
                          {element?.get_employee_id?.employee_code
                            ? element?.get_employee_id?.employee_code
                            : null}
                        </td>
                        <td className="align-items-center text-break">{`${element?.get_user_name?.firstname} ${element?.get_user_name?.lastname}`}</td>
                        <td className="align-items-center text-break">
                          {element?.payment_type}
                        </td>
                        <td className="align-items-center text-break">
                          {element?.amount}
                        </td>
                        <td className="align-items-center text-break">
                          {element?.merchant_transaction_id}
                        </td>
                        <td>{element?.billdesk_transaction_id}</td>
                        <td className="align-items-center">
                          {element?.status}
                        </td>
                        <td
                          onClick={() => {
                            handlePdfcall(
                              element?.url_80g_download,
                              element?.address,
                              element?.pan_number,
                              element?.address1
                            );
                          }}
                          style={{ cursor: "pointer" }}
                          className={` ${
                            element?.url_80g_download.length < 6 ? "" : ""
                          } `}
                        >
                          {element?.status == "Pending" ||
                          element?.pan_number?.length < 10 ? (
                            <div className="">NA</div>
                            
                          ) : (
                            <div className="d-flex ">
                              <BsFileEarmarkArrowDownFill className="icon-download" />
                              80G
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                data={transactions}
                page={page}
                handlePageClick={handlePageClick}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                isLoading={isLoading}
              />
            </div>
          </div>
          <FileUpload />
        </>
      )}
    </>
  );
}

export default TransactionsTable;
