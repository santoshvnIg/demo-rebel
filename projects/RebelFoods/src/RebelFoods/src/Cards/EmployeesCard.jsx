import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./card.scss";
import { DataService } from "../Services/Dataservice";
import { BsFillPeopleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveEmployeesdata } from "../Store/employeesSlice";

const EmployeesCard = ({ callApi }) => {
  const [value, setValue] = useState(1);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const StatusUpdateApi = (token, data) => {
    const statusUpdate = DataService.StatusUpdate(token, data);
    statusUpdate
      .then((res) => {
        if (res?.status === 200) {
          setCount(res?.data?.data?.total);
        } else {
          toast.error("Somthing went wrong");
        }
      })
      .catch((error) => {
        if (error?.message) {
          toast.error("Somthing went wrong");
        }
      });
  };
  useEffect(() => {
    StatusUpdateApi(token, value);
    dispatch(saveEmployeesdata(value));
  }, [value, callApi]);

  return (
    <>
      <div className="d-flex justify-content-start p-lg-3">
        <Card className="pr-lg-2 mr-lg-3 cardemployee">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h className="heading">Total Employees</h>
              <Form.Select
                aria-label="Default select   EmployeeModel"
                className="formselect"
                onChange={handleChange}
                value={value}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
                {/* <option value={2}>Resigned</option> */}
              </Form.Select>
            </div>
            <div className="d-flex">
              <div className="moneyicondiv">
                <BsFillPeopleFill className="moneyicon" />
              </div>
              <div>
                <h className="count">{count}</h>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default EmployeesCard;
