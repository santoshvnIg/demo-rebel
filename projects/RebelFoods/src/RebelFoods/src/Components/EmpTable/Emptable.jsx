import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AiFillEdit } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Emptable.scss";
import { useState } from "react";
import EmployeeModal from "../../Model/EmployeeModel";
import SkeletonTable from "../../Common/SkeletonTable";
import Pagination from "../Pagination/Pagination";
import { DataService } from "../../Services/Dataservice";
import { toast } from "react-toastify";


function EmpTable({ callApi, setCallApi }) {
  const [employees, setEmployees] = useState(null);
  const [searchvalue, SetSearchvalue] = useState("");
  const [show, setShow] = useState(false);
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [togal, setTogal] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [searial, setSerial] = useState(null);
  const [page, setPage] = useState(1);

  // const [status,setStatus]=useState(useSelector((state)=>{
  //   return state.employeesDetails
  // }))

  
  const handleEdite = (data) => {
    setdata(data);
    setShow(true);
  };

  const handlePrevClick = () => {
    if (page - 1 > 0) setPage((prevPage) => prevPage - 1);
    return null;
  };

  const handleNextClick = () => {
    if (page + 1 <= employees?.last_page) setPage((prevPage) => prevPage + 1);
    return null;
  };

  const handlePageClick = (e) => {
    setPage(parseInt(e.target.innerText, 10));
  };

  //Employee listing Api call
  const EmployeeApi = (token, page,searchvalue) => {
    setIsLoading(true);
    
    const payrollData = DataService.EmployeeLisList(token, page,searchvalue);

    toast
      .promise(payrollData, {
        pending: "Waiting for the respose",
      })

      .then((res) => {
        if (res) {
          setLoading(false);
          setEmployees(res?.data?.data);
          setSerial(res?.data?.data?.from);
          setPage(res?.data?.data?.current_page);
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


  // search Api call
  const EmployeeSearchApi = (token,  data) => {
    setIsLoading(true);
    const payrollData = DataService.EmployeeSearch(token,  data);

    toast
      .promise(payrollData, {
        pending: "Waiting for the respose",
      })

      .then((res) => {
        if (res) {
          setLoading(false);
          setEmployees(res?.data?.data);
          setPage(res?.data?.data?.current_page);
          toast.success("Updated successfully");
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
  const handleFilterClick = () => {
   
    if (togal) {
      EmployeeSearchApi(token,searchvalue);
    } else if (!togal) {
      SetSearchvalue("");
      EmployeeSearchApi(token,  "");
    }
    setTogal(!togal);
  };

  useEffect(() => {

    EmployeeApi(token, page,searchvalue);
  }, [page, callApi]);
 
  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="main" id="Employeetable">
            <div className="d-flex ">
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  value={searchvalue}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Search by Employee phone number / Employee email"
                  style={{ background: "#F2F2F2" }}
                  onChange={(e) => SetSearchvalue(e.target.value)}
                />
              </InputGroup>

              <div>
                <p
                  onClick={handleFilterClick}
                  className="filtername"
                  style={{ marginLeft: "1rem" }}
                >
                  {togal ? "Apply Filter" : "Clear"}
                </p>
              </div>
            </div>

            <div
              className={`overflow-auto ${
                employees?.data?.length < 5
                  ? "table-height"
                  : "table-height-auto"
              } `}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Employee Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Donations</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.data?.map((employeelist,index) => {
                    return (
                      <tr>
                         <td>{searial + index}</td>
                        <td>{employeelist?.employee_code}</td>
                        <td>{employeelist?.firstname} {employeelist?.lastname}</td>
                        <td>{employeelist?.email}</td>
                        <td>{employeelist?.mobile}</td>
                        <td>{employeelist?.total_donation}</td>
                        <td>{employeelist?.status}</td>
                        <td className="d-flex  justify-content-around">
                          <div>
                            <AiFillEdit
                              className="edite"
                              onClick={() => {
                                handleEdite(employeelist);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                data={employees}
                page={page}
                handlePageClick={handlePageClick}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                isLoading={isLoading}
              />
            </div>
          </div>

          <EmployeeModal
            show={show}
            setShow={setShow}
            data={data}
            setCallApi={setCallApi}
            callApi={callApi}
          />
        </>
      )}
    </>
  );
}

export default EmpTable;
