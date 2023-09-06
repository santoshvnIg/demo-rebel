import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ngoModel.scss";
import { DataService } from "../Services/Dataservice";
import { toast } from "react-toastify";
import swal from "sweetalert";

const initialNgomodelData = {
  role: "",
  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  swiftCode: "",
  mobileNumber: "",
};

const NgomodelFormModal = ({ show, setShow, uuid ,callApi}) => {
  const [ngomodelData, setNgomodelData] = useState(initialNgomodelData);
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [cancelledCheckFile, setCancelledCheckFile] = useState(null);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
 
    setNgomodelData({
      ...ngomodelData,
      [name]: value,
    });
  };

  const handleAadharCardFileChange = (event) => {
    const file = event.target.files[0];
    setAadharCardFile(file);
  };

  const handleCancelledCheckFileChange = (event) => {
    const file = event.target.files[0];
    setCancelledCheckFile(file);
  };
  const AddBankAccountApi = (token, data) => {
    const addBankApi = DataService.AddBankAccount(token, data);
    toast
      .promise(addBankApi, {
        pending: "Uploading in process",
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response?.data?.message);
          // props.setShow(false);
          swal({
            icon: "success",
            title: response?.data?.message,
            // text: response?.data?.message,
            timer: 2000,
            showConfirmButton: false,
          });
          callApi()
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setShow(false);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      }
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const aadharCardBase64 = await convertFileToBase64(aadharCardFile);
    const cancelledCheckBase64 = await convertFileToBase64(cancelledCheckFile);

    const validationErrors = {};
    if (!ngomodelData.accountHolderName) {
      validationErrors.accountHolderName = "Account holder name is required.";
    }else if(! /^[A-Za-z\s]+$/.test(ngomodelData.accountHolderName)) {
      validationErrors.accountHolderName = "Only letters are allowed.";
    }

    if (!ngomodelData.mobileNumber) {
      validationErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^[0-9]{10}$/.test(ngomodelData.mobileNumber)) {
      validationErrors.mobileNumber = "Invalid mobile number.";
    }

    if (!ngomodelData.bankName) {
      validationErrors.bankName = "Bank name is required.";
    }else if(! /^[A-Za-z\s]+$/.test(ngomodelData.bankName)) {
      validationErrors.bankName = "Only letters are allowed.";
    }

    if (!ngomodelData.ifscCode) {
      validationErrors.ifscCode = "IFSC code is required.";
    } else if (!/^[A-Z]{4}[0][A-Z0-9]{6}$/.test(ngomodelData.ifscCode)) {
      validationErrors.ifscCode = "Invalid IFSC code.";
    }

    if (!ngomodelData.role) {
      validationErrors.role = "Role is required.";
    }

    if (!aadharCardFile) {
      validationErrors.aadharCard = "PAN Card file is required.";
    }

    if (!cancelledCheckFile) {
      validationErrors.cancelledCheck = "Cancelled Cheque file is required.";
    }
    if (!ngomodelData.accountNumber) {
      validationErrors.accountNumber = "Account Number is required.";
    } else if (!/^\d+$/.test(ngomodelData.accountNumber)) {
      validationErrors.accountNumber = "Account Number must contain only numbers.";
    } else if (
      ngomodelData.accountNumber.length < 9 ||
      ngomodelData.accountNumber.length > 18
    ) {
      validationErrors.accountNumber = "Account Number must be between 9 to 18 digits.";
    }
    

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        type: "ngo",
        uuid: uuid,
        bank_name: ngomodelData.bankName,
        ifsc_code: ngomodelData.ifscCode,
        account_number: ngomodelData.accountNumber,
        account_holder_name: ngomodelData.accountHolderName,
        cancelled_cheque: cancelledCheckBase64,
        relation: ngomodelData.role,
        pan_card: aadharCardBase64,
      };
      AddBankAccountApi(token, formData);
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>NGO </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ngo-modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={ngomodelData.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="CXO">CXO</option>
              <option value="Trustee">Trustee</option>
              <option value="Director">Director</option>
              <option value="Chairperson">Chairperson</option>
              <option value="Employee/Staff">Employee/Staff</option>
              <option value="Volunteer/Fellow">Volunteer/Fellow</option>
              <option value="Corporate Associate">Corporate Associate</option>
            </Form.Control>
            {errors.role && (
              <Form.Text className="text-danger">{errors.role}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="accountHolderName">
            <Form.Label>Account Holder Name</Form.Label>
            <Form.Control
              type="text"
              name="accountHolderName"
              value={ngomodelData.accountHolderName}
              onChange={handleInputChange}
            />
            {errors.accountHolderName && (
              <Form.Text className="text-danger">
                {errors.accountHolderName}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={ngomodelData.mobileNumber}
              onChange={handleInputChange}
            />
            {errors.mobileNumber && (
              <Form.Text className="text-danger">
                {errors.mobileNumber}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="bankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="bankName"
              value={ngomodelData.bankName}
              onChange={handleInputChange}
            />
            {errors.bankName && (
              <Form.Text className="text-danger">{errors.bankName}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="ifscCode">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              name="ifscCode"
              value={ngomodelData.ifscCode}
              onChange={handleInputChange}
            />
            {errors.ifscCode && (
              <Form.Text className="text-danger">{errors.ifscCode}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="accountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              name="accountNumber"
              value={ngomodelData.accountNumber}
              onChange={handleInputChange}
            />
            {errors.accountNumber && (
              <Form.Text className="text-danger">
                {errors.accountNumber}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="swiftCode">
            <Form.Label>SWIFT Code</Form.Label>
            <Form.Control
              type="text"
              name="swiftCode"
              value={ngomodelData.swiftCode}
              onChange={handleInputChange}
            />
            {errors.swiftCode && (
              <Form.Text className="text-danger">{errors.swiftCode}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="aadharCard">
            <Form.Label>PAN Card</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleAadharCardFileChange}
            />
            {errors.aadharCard && (
              <Form.Text className="text-danger">{errors.aadharCard}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="cancelledCheck">
            <Form.Label>Cancelled Cheque</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleCancelledCheckFileChange}
            />
            {errors.cancelledCheck && (
              <Form.Text className="text-danger">
                {errors.cancelledCheck}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="footer-hospital">
     
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
            callApi()
          }}
        >
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NgomodelFormModal;
