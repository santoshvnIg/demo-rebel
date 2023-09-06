import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./card.scss";
import { DataService } from "../Services/Dataservice";
import { toast } from "react-toastify";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const FundRisedCard = () => {
 
  const [duration, setDuration] = useState(1);
  const [fundData, setFundData] = useState(0);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setDuration(e.target.value);
  };
  const TotalFundRisedApi = (data, token) => {
    const totalFundRised = DataService.TotalFundRaised(data, token);
    toast
      .promise(totalFundRised, {
        // pending: "Waiting for the respose",
      })

      .then((res) => {
        if (res?.status == 200) {
          // toast.success("API request successful");
          setFundData(res?.data?.data);
        } else {
          toast.error("Somthing went wrong");
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Somthing went wrong");
        }
      });
  };

  useEffect(() => {
    TotalFundRisedApi({ duration: duration }, token);
  }, [duration]);

  return (
    <>
      <div className="d-flex justify-content-start p-lg-3">
        <Card className="pr-lg-2 mr-lg-3 cardemployee">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h className="heading">Total Funds Raised</h>
              <Form.Select
                aria-label="Default select   EmployeeModel"
                className="formselect"
                value={duration}
                onChange={handleChange}
              >
                <option value="1">Today</option>
                <option value="2">1 Month</option>
                <option value="3">3 Month</option>
                <option value="4">All</option>
              </Form.Select>
            </div>
            <div className="d-flex">
              <div className="moneyicondiv">
                <FaRegMoneyBillAlt className="moneyicon" />
              </div>
              <div>
                <h className="count">{fundData}</h>
         
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default FundRisedCard;
