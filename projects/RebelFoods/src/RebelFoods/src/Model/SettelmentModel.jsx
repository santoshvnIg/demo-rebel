import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./SettelmentModel.scss";
import { useState } from "react";
import { DataService } from "../Services/Dataservice";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SettelmentModel = ({ show, setShow, CampaignId }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [settelmentDetails, setSettelmentDetails] = useState({
    bankId: "",
    amount: "",
  });
  const [ApiData, SetApiData] = useState(null);
  const token = localStorage.getItem("token");
  const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "doc"];
  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
  };
  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    if (value === "" && name === "amount") {
      setErrorMessage("Amount is required.");
    } else if (
      Number(value) > ApiData?.total_withdrawable_amt &&
      name === "amount"
    ) {
      setErrorMessage("Amount should be less then Withdrawal Amount.");
    }else if (
      Number(value) <=0 &&
      name === "amount"
    ) {
      setErrorMessage("Amount should be  0.");
    } else if (!/^\d*(\.\d*)?$/.test(value) && name === "amount") {
      setErrorMessage("Only numbers allowed");
    } else {
      setErrorMessage("");
    }
    setSettelmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // File Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileDataUrl = event.target.result;
        const fileExtension = file.name.split(".").pop();

        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
          setSelectedFile(fileDataUrl);
          setErrorMessage("");
        } else {
          setSelectedFile(null);
          setErrorMessage(
            "Invalid file format. Allowed formats: pdf, jpg, jpeg, png, doc"
          );
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const hospitalApi = (token, id) => {
    const hopitalData = DataService.BankList(token, id);

    hopitalData
      .then((respose) => {
        if (respose.status == 200) {
          SetApiData(respose?.data);
          setSettelmentDetails((prevSate) => ({
            ...prevSate,
            bankId: respose?.data?.data[0]?.id,
          }));
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong");
      });
  };

  const SettlementRequestApiApi = (token, formData) => {
    const Settelmentcreate = DataService.SettlementRequest(token, formData);
    toast
      .promise(Settelmentcreate, {
        pending: "Waiting for the respose",
      })
      .then((response) => {
       
        if (response.status == 200) {
          toast.success(response?.data.message);
          setShow(false);
        }else{
          toast.info(response?.data.message);
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong");
      });
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();

    const formData = {
      campaignId: CampaignId,
      settlementAmt: Number(settelmentDetails.amount),
      accountId: settelmentDetails.bankId,
      hospitalBill: selectedFile,
    };
    setErrorMessage("");
    if (settelmentDetails.amount === "") {
      setErrorMessage("Amount is required.");
      return;
    }
    if (settelmentDetails.hospitalName === "") {
      setErrorMessage("Hospital name is required.");
      return;
    }
    if (selectedFile === "") {
      setErrorMessage("File is required.");
      return;
    }
    if (errorMessage.length == 0) {
      SettlementRequestApiApi(token, formData);
    } else {
    }
  };

  useEffect(() => {
    hospitalApi(token, CampaignId);
  }, [CampaignId]);

  return (
    <>
      <div>
        <Container style={{ backgroundColor: "#EDF9FF !important" }}>
          <Modal
            show={show}
            onHide={handleClose}
            style={{ padding: "1rem" }}
            className="settlement-model"
          >
            <div className="p-4">
              <h>Settlement Request</h>
              <br />
              <Form>
                <div className="row">
                  <Form.Group
                    className="mb-3"
                    controlId="EmployeeModelForm.ControlInput1"
                  >
                    <Form.Label>Campaign Name:</Form.Label>
                    {ApiData?.slug_title ? (
                      <Form.Control
                        type="Name"
                        placeholder="Name"
                        name="slug_title"
                        autoFocus
                        value={ApiData?.slug_title}
                        className="input-bg"
                        disabled
                      />
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Form.Group>

                  <p className="fs-15">
                    Note - If Campaign is not found, then Create a Campaign from
                    Campaigns section
                  </p>
                </div>
                <div>
                  Total Funds Available in Campaign{" "}
                  <span style={{ fontWeight: "500" }}>
                    &#8377;{ApiData?.total_withdrawable_amt}
                  </span>{" "}
                </div>

                <div className="row">
                  <div className="col-12">
                    <Form.Group
                      className="mb-3"
                      controlId="EmployeeModelForm.ControlInput1"
                    >
                      <Form.Label>Withdrawal Amount</Form.Label>
                      {ApiData?.total_withdrawable_amt ? (
                        <Form.Control
                          type="Name"
                          placeholder="Amount"
                          name="amount"
                          autoFocus
                          value={setSettelmentDetails.amount}
                          onChange={handleSelectChange}
                          className="input-bg"
                        />
                      ) : (
                        <>
                          <Skeleton />
                          <Skeleton />
                        </>
                      )}
                    </Form.Group>
                    <p>
                      Insufficient funds - Go to Campaigns section and add funds
                      from main pool to this campaign
                    </p>
                  </div>
                  <div className="col-12">
                    <Form.Group
                      className="mb-3"
                      controlId="  EmployeeModelForm.ControlInput1"
                    >
                      <Form.Label>Select Bank Account</Form.Label>

                      {ApiData?.data ? (
                        ApiData.data.length > 0 ? (
                          <Form.Select
                            aria-label="Default select   EmployeeModel"
                            name="bankId"
                            value={setSettelmentDetails.bankId}
                            onChange={handleSelectChange}
                            className="input-bg"
                            disabled={ApiData?.data ? false : true}
                          >
                            {ApiData?.data?.map((element) => {
                              return (
                                <option value={element.id}>
                                  {`${element?.bank_name}  (${element?.account_number} )`}
                                </option>
                              );
                            })}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="Name"
                            placeholder="No Bank Account Added"
                            name="amount"
                            autoFocus
                            className="input-bg"
                            disabled
                          />
                        )
                      ) : (
                        <>
                          <Skeleton />
                          <Skeleton />
                        </>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </Form>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Hospital Bills / Estimation Letter</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  className="input-bg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </Form.Group>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <Modal.Footer>
              <Button
                variant="primary"
                className="save-Button"
                onClick={handleFileSubmit}
              >
                Complete
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="cancel-button"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default SettelmentModel;
