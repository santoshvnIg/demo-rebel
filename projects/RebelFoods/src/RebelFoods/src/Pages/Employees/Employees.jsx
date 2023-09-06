import React,{useState} from "react";
import FundRisedCard from "../../Cards/FundRised";
import EmpTable from "../../Components/EmpTable/Emptable";
import EmployeesCard from "../../Cards/EmployeesCard";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Employees = () => {
  const [callApi, setCallApi] = useState(false);
  return (
    <>
      <div
        className="d-lg-flex justify-content-start p-3"
        style={{ background: "#F8F8F8" }}
      >
        <EmployeesCard  callApi={callApi} />
        <FundRisedCard />
      </div>
      <EmpTable  callApi={callApi} setCallApi={setCallApi}/>
      <ToastContainer  position="top-right"
        autoClose={500}
       />
    </>
  );
};

export default Employees;
