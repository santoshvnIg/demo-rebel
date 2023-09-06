import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { DataService } from "../Services/Dataservice";
import HospitalListModel from "./HospitalListModel";
import NgomodelFormModal from "./NgoModel";
import { toast } from "react-toastify";
import swal from "sweetalert";

const CampaignsModel = ({ show, setShow, typeCampaigns, callApi }) => {
  const [beneficiary, setBeneficiary] = useState({
    beneficiaryName: "",
    beneficiaryLastName: "",
    beneficiaryPhoneNumber: "",
    beneficiaryAge: "",
    beneficiaryCity: "",
    beneficiaryDisease: "",
    hospitalName: "",
    goalAmount: "",
    beneficiaryLetter: "",
    estimationLetter: "",
    campaignImageLetter: "",
  });
  const [error, setError] = useState({});
  const [uuid, setUuid] = useState(null);
  const [showcamp, setShowcamp] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => {
    setShow(false);
  };
  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBeneficiary((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  };
  // Upload File
  const handleUpload = (event) => {
    let name = event.target.name;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        // setBase64Data(reader.result);
        if (name == "beneficiaryLetter") {
          setBeneficiary((prevSate) => ({
            ...prevSate,
            beneficiaryLetter: reader.result,
          }));
        } else if (name == "estimationLetter") {
          setBeneficiary((prevSate) => ({
            ...prevSate,
            estimationLetter: reader.result,
          }));
        } else if (name == "campaignImageLetter") {
          setBeneficiary((prevSate) => ({
            ...prevSate,
            campaignImageLetter: reader.result,
          }));
        }
      };
    }
  };
  // validation Function
  const validateInput = () => {
    let newErrors = {};
    if (beneficiary.beneficiaryName.length < 1) {
      newErrors.beneficiaryName = "Beneficiary First name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(beneficiary.beneficiaryName)) {
      newErrors.beneficiaryName = "Only letters are allowed.";
    }
    if (beneficiary.beneficiaryLastName.length < 1) {
      newErrors.beneficiaryLastName = "Beneficiary Last name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(beneficiary.beneficiaryLastName)) {
      newErrors.beneficiaryLastName = "Only letters are allowed.";
    }
    if (beneficiary.beneficiaryCity.length < 1) {
      newErrors.beneficiaryCity = "Beneficiary City name is required.";
    }
    if (!/^[A-Za-z\s]+$/.test(beneficiary.beneficiaryCity)) {
      newErrors.beneficiaryCity = "Only letters are allowed.";
    }
    if (beneficiary.beneficiaryDisease.length < 1) {
      newErrors.beneficiaryDisease = "Beneficiary Disease Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(beneficiary.beneficiaryDisease)) {
      newErrors.beneficiaryDisease = "Only letters are allowed.";
    }
    if (beneficiary.hospitalName.length < 1) {
      newErrors.hospitalName = "  Hospital name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(beneficiary.hospitalName)) {
      newErrors.hospitalName = "Only letters are allowed.";
    }
    if (!/^[0-9]+$/.test(beneficiary.beneficiaryAge)) {
      newErrors.beneficiaryAge = "Beneficiary Age must be a number.";
    } else if (Number(beneficiary).beneficiaryAge > 100) {
      newErrors.beneficiaryAge =
        "Beneficiary Age can not exceed more than ten hundred";
    }
    if (!/^[0-9]{10}$/.test(beneficiary.beneficiaryPhoneNumber)) {
      newErrors.beneficiaryPhoneNumber = "Enter valid Phone Number.";
    }
    if (!/^[0-9]+$/.test(beneficiary.goalAmount)) {
      newErrors.goalAmount = "Goal Amount must be a number.";
    } else if (beneficiary.goalAmount.length < 1) {
      newErrors.goalAmount = "Goal Amount must  is required.";
    } else if (Number(beneficiary.goalAmount) < 5000) {
      newErrors.goalAmount = "Goal Amount must be atleast 5000.";
    }
    if (!beneficiary.beneficiaryLetter) {
      newErrors.beneficiaryLetter = "Beneficiary PAN Card is required.";
    }
    if (!beneficiary.estimationLetter) {
      newErrors.estimationLetter = "Estimation Letter file is required.";
    }
    if (!beneficiary.campaignImageLetter) {
      newErrors.campaignImageLetter = "Campaign Image is required.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create Campaign Api
  const CreateCampaignApi = (token, formData) => {
    const newCampaign = DataService.CreateCampaign(token, formData);

    toast
      .promise(newCampaign, {
        pending: "Waiting for the respose",
      })

      .then((response) => {
        if (response.status == 200) {
          toast.success(response?.data?.message);
          setUuid(response?.data?.uuid);

          swal({
            icon: "success",
            title: response?.data?.message,
            // text: response?.data?.message,
            timer: 2000,
            showConfirmButton: false,
          });
          setShow(false);
          setShowcamp(true);
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error("Somthing went wrong");
      });
  };

  const handleSubmit = () => {
    const formData = {
      fundraiser_media: beneficiary.campaignImageLetter,
      type: typeCampaigns,
      firstname: beneficiary.beneficiaryName,
      lastname: beneficiary.beneficiaryLastName,
      mobile: beneficiary.beneficiaryPhoneNumber,
      age: beneficiary.beneficiaryAge,
      city: beneficiary.beneficiaryCity,
      disease: beneficiary.beneficiaryDisease,
      hospital_name: beneficiary.hospitalName,
      goal_amount: beneficiary.goalAmount,
      pan_card: beneficiary.beneficiaryLetter,
      estimate_letter: beneficiary.estimationLetter,
    };

    if (validateInput()) {
      CreateCampaignApi(token, formData);
      setError({});
      setShow(false);
      setBeneficiary({
        beneficiaryName: "",
        beneficiaryLastName: "",
        beneficiaryPhoneNumber: "",
        beneficiaryAge: "",
        beneficiaryCity: "",
        beneficiaryDisease: "",
        hospitalName: "",
        goalAmount: "",
        beneficiaryLetter: "",
        estimationLetter: "",
        campaignImageLetter: "",
      });
    }
  };

  return (
    <>
      <div>
        <Container style={{ backgroundColor: "#EDF9FF !important" }}>
          <Modal show={show} onHide={handleClose} style={{ padding: "1rem" }}>
            <div className="p-4">
              <h>Add Beneficiary details</h>
              <br />
              <br />
              <Form>
                <div className="row">
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="Name"
                        placeholder="Beneficiary First Name"
                        name="beneficiaryName"
                        autoFocus
                        value={beneficiary?.beneficiaryName}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.beneficiaryName && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryName}
                      </span>
                    )}
                  </div>
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="Name"
                        placeholder="Beneficiary Last Name"
                        name="beneficiaryLastName"
                        autoFocus
                        value={beneficiary?.beneficiaryLastName}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.beneficiaryLastName && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryLastName}
                      </span>
                    )}
                  </div>

                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="  EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Beneficiary Phone number"
                        name="beneficiaryPhoneNumber"
                        autoFocus
                        value={beneficiary?.beneficiaryPhoneNumber}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.beneficiaryPhoneNumber && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryPhoneNumber}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Beneficiary Age"
                        name="beneficiaryAge"
                        autoFocus
                        value={beneficiary?.beneficiaryAge}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                        max={99}
                        min={1}
                      />
                    </Form.Group>
                    {error.beneficiaryAge && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryAge}
                      </span>
                    )}
                  </div>
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="  EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="Name"
                        placeholder="Beneficiary City"
                        name="beneficiaryCity"
                        autoFocus
                        value={beneficiary?.beneficiaryCity}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.beneficiaryCity && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryCity}
                      </span>
                    )}
                  </div>
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="  EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="Name"
                        placeholder="Beneficiary Disease"
                        name="beneficiaryDisease"
                        autoFocus
                        value={beneficiary?.beneficiaryDisease}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.beneficiaryDisease && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryDisease}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId="  EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="Name"
                        placeholder="Hospital Name"
                        name="hospitalName"
                        autoFocus
                        value={beneficiary?.hospitalName}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.hospitalName && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.hospitalName}
                      </span>
                    )}
                  </div>
                  <div className="col-12">
                    <Form.Group
                      className="mb-1"
                      controlId=" EmployeeModelForm.ControlInput1"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Goal Amount"
                        name="goalAmount"
                        autoFocus
                        value={beneficiary?.goalAmount}
                        onChange={handleSelectChange}
                        className="input-bg mt-2"
                      />
                    </Form.Group>
                    {error.goalAmount && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.goalAmount}
                      </span>
                    )}
                  </div>
                </div>
              </Form>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="formFileSm" className="mb-1">
                    <Form.Label>Upload PAN Card</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="beneficiaryLetter"
                      className="input-bg mt-2"
                      accept=".jpg,.jpeg,.png,.gif,.pdf"
                      onChange={handleUpload}
                    />
                    {error.beneficiaryLetter && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.beneficiaryLetter}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="formFileSm" className="mb-1">
                    <Form.Label> Cost Estimation Letter</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="estimationLetter"
                      className="input-bg mt-2"
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleUpload}
                    />
                    {error.estimationLetter && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.estimationLetter}
                      </span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="formFileSm" className="mb-1">
                    <Form.Label>Campaign Image</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="campaignImageLetter"
                      className="input-bg mt-2"
                      accept="image/*"
                      onChange={handleUpload}
                    />
                    {error.campaignImageLetter && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {error.campaignImageLetter}
                      </span>
                    )}
                  </Form.Group>
                </div>
              </div>
            </div>

            <Modal.Footer>
              <Button
                variant="primary"
                className="save-Button"
                onClick={handleSubmit}
              >
                Submit
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

        {typeCampaigns == 5 ? (
          <HospitalListModel
            show={showcamp}
            setShow={setShowcamp}
            uuid={uuid}
            callApi={callApi}
          />
        ) : (
          <NgomodelFormModal
            show={showcamp}
            setShow={setShowcamp}
            uuid={uuid}
            callApi={callApi}
          />
        )}
      </div>
    </>
  );
};

export default CampaignsModel;
