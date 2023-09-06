import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Tab, Tabs, Form } from "react-bootstrap";
import { DataService } from "../Services/Dataservice";
import "./hospitalListModel.scss";
import { toast } from "react-toastify";
import swal from "sweetalert";

function HospitalModel(props) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [hospitalList, SetHospitalList] = useState([]);
  const [existingHospitals, SetExistingHospitals] = useState([]);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    tab1: {
      howIAmLabeled: "",
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      SwiftCode: "",
      reason: "",
      mobileNumber: "",
      document: "",
    },
    tab2: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      SwiftCode: "",
      selectedHospital: "New",
      selectedBankAccounts: "",
      document: "",
    },

    tab3: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      SwiftCode: "",
      document: "",
    },
  });

  const [validationErrors, setValidationErrors] = useState({
    tab1: {},
    tab2: {},
    tab3: {},
  });

  const validationRules = {
    tab1: {
      howIAmLabeled: {
        required: true,
        message: "How I Am Labeled is required.",
      },
      accountHolderName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message:
          "Account Holder Name is required and must contain only letters.",
      },
      accountNumber: {
        required: true,
        pattern: /^[0-9]{9,18}$/,
        message: "Invalid account number format.",
      },
      bankName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message: "Bank Name is required and must contain only letters..",
      },
      ifscCode: {
        required: true,
        pattern: /^[A-Za-z]{4}\d{7}$/,
        message: "Invalid IFSC code format.",
      },
      // SwiftCode: {
      //   required: true,
      //   message: "SwiftCode is required.",
      // },
      reason: {
        required: true,
        message: "Reason is required.",
      },
      mobileNumber: {
        required: true,
        pattern: /^[0-9]{10}$/,
        message: "Invalid mobile number format.",
      },
      document: {
        required: true,
        message: "Document is required.",
      },
    },
    tab2: {
      accountHolderName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message:
          "Account Holder Name is required and must contain only letters.",
      },
      accountNumber: {
        required: true,
        pattern: /^[0-9]{9,18}$/,
        message: "Invalid account number format.",
      },
      bankName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message: "Bank Name is required and must contain only letters..",
      },
      ifscCode: {
        required: true,
        pattern: /^[A-Za-z]{4}\d{7}$/,
        message: "Invalid IFSC code format.",
      },
      // SwiftCode: {
      //   required: true,
      //   message: "SwiftCode is required.",
      // },
      // selectedBankAccounts: {
      //   required: true,
      //   message: "Selected Bank Accounts is required.",
      // },
      document: {
        required: true,
        message: "Document is required.",
      },
    },
    tab3: {
      accountHolderName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message:
          "Account Holder Name is required and must contain only letters.",
      },
      accountNumber: {
        required: true,
        pattern: /^[0-9]{9,18}$/,
        message: "Invalid account number format.",
      },
      bankName: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        message: "Bank Name is required and must contain only letters..",
      },
      ifscCode: {
        required: true,
        pattern: /^[A-Za-z]{4}\d{7}$/,
        message: "Invalid IFSC code format.",
      },
      // SwiftCode: {
      //   required: true,
      //   message: "SwiftCode is required.",
      // },
      document: {
        required: true,
        message: "Document is required.",
      },
    },
    // Add more tabs if needed
  };
  // validation constant

  const handleClose = () => {
    props.setShow(false);
    
  };
  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  };
  const handleInputChange = (event, tab) => {
    const { name, value } = event.target;

    if (name === "selectedHospital") {
      setFormData((prevData) => ({
        ...prevData,
        [tab]: {
          ...prevData[tab],
          selectedHospital: parseInt(value), // Convert the value to an integer
        },
      }));

      if (value != "New") {
        GetHospitalAccountApi(token, { hospital_id: parseInt(value) });
      }
    }
    if (name === "selectedBankAccounts") {
      setFormData((prevData) => ({
        ...prevData,
        [tab]: {
          ...prevData[tab],
          selectedBankAccounts: parseInt(value), // Convert the value to an integer
        },
      }));
    }
    if (name === "document") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prevData) => ({
            ...prevData,
            [tab]: {
              ...prevData[tab],
              document: e.target.result, // Convert the value to an integer
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [tab]: { ...prevData[tab], [name]: value },
    }));
  };

  // hospital list Api
  const GetHospitalListApi = (token) => {
    const HospitalList = DataService.GetHospitalList(token);
    HospitalList.then((response) => {
      if (response.status == 200) {
        SetHospitalList(response?.data?.data);
      } else {
        toast.error("Somthing went wrong");
      }
    }).catch((error) => {
      toast.error("Somthing went wrong");
    });
  };
  // Hospital Account Api
  const GetHospitalAccountApi = (token, data) => {
    const HospitalAccount = DataService.GetHospitalAccount(token, data);
    HospitalAccount.then((response) => {
      if (response.status == 200) {
        SetExistingHospitals(response?.data?.data);
      } else {
        toast.error("Somthing went wrong");
      }
    }).catch((error) => {
      toast.error("Somthing went wrong");
    });
  };
  // Add Bank Account Api
  const AddBankAccountApi = (token, data) => {
    const addBankApi = DataService.AddBankAccount(token, data);
    toast
      .promise(addBankApi, {
        pending: "Uploading in process",
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response?.data?.message);
          props.setShow(false);
          swal({
            icon: "success",
            title: response?.data?.message,
            // text: response?.data?.message,
            timer: 2000,
            showConfirmButton: false,
          });
          props.callApi()
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // Function for validation
  const functionValidation = (formData, tabb) => {

    let result = false;
    const tabValidationRules = validationRules[tabb];

    for (const fieldName in tabValidationRules) {
      if (tabValidationRules.hasOwnProperty(fieldName)) {
        const fieldRules = tabValidationRules[fieldName];

        if (
          fieldRules.required &&
          (!formData[tabb][fieldName] ||
            formData[tabb][fieldName].trim() === "")
        ) {
          setValidationErrors((prevValidationErrors) => ({
            ...prevValidationErrors,
            [tabb]: {
              ...prevValidationErrors[tabb],
              [fieldName]: fieldRules.message,
            },
          }));
          return
        } else if (
          fieldRules.pattern &&
          !fieldRules.pattern.test(formData[tabb][fieldName])
        ) {
          setValidationErrors((prevValidationErrors) => ({
            ...prevValidationErrors,
            [tabb]: {
              ...prevValidationErrors[tabb],
              [fieldName]: fieldRules.message,
            },
          }));
            return
        } else {
          setValidationErrors((prevValidationErrors) => {
            const updatedErrors = { ...prevValidationErrors[tabb] };
            delete updatedErrors[fieldName];

            return {
              ...prevValidationErrors,
              [tabb]: updatedErrors,
            };
          });
          result = false;
        }
      }
    }
    return result;
  };

  const handleSaveAndNext = () => {
    functionValidation(formData, activeTab)
 
      let finalData;
      if (activeTab == "tab1") {
        finalData = {
          type: "personal",
          uuid: props.uuid,
          beneficiary_type: 5,
          user_identity: formData.tab1.howIAmLabeled,
          bank_name: formData.tab1.bankName,
          ifsc_code: formData.tab1.ifscCode,
          account_number: formData.tab1.accountNumber,
          account_holder_name: formData.tab1.accountHolderName,
          cancelled_cheque: formData.tab1.document,
          reason: formData.tab1.reason,
          account_holder_country_code: "91",
          account_holder_mobile: formData.tab1.mobileNumber,
        };
      } else if (activeTab == "tab2") {
        if (formData.tab2.selectedHospital == "New") {
          finalData = {
            type: "hospital",
            uuid: props.uuid,
            beneficiary_type: 5,
            partner_id: "13292",
            bank_name: formData.tab2.bankName,
            ifsc_code: formData.tab2.ifscCode,
            account_number: formData.tab2.accountNumber,
            account_holder_name: formData.tab2.accountHolderName,
            hospital_account_slip: formData.tab2.document,
          };
        } else {
          finalData = {
            type: "hospital",
            uuid: props.uuid,
            beneficiary_type: 5,
            partner_id: formData.tab2.selectedHospital,
            account_id: formData.tab2.selectedBankAccounts,
          };
        }
      }
      if (activeTab == "tab3") {
        finalData = {
          type: "pharmacy",
          uuid: props.uuid,
          beneficiary_type: 5,
          bank_name: formData.tab3.bankName,
          ifsc_code: formData.tab3.ifscCode,
          account_number: formData.tab3.accountNumber,
          account_holder_name: formData.tab3.accountHolderName,
          pharmacy_account_slip: formData.tab3.document,
        };
      }
    
      AddBankAccountApi(token, finalData);
     
    
  };

  useEffect(() => {
    GetHospitalListApi(token);
  }, [formData.tab2.selectedHospital ,validationErrors]);
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="model-Hospital"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="hospital-modal-body">
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabSelect}
            id="modal-tabs"
          >
            <Tab eventKey="tab1" title="Personal">
              <Form>
                <Form.Group>
                  <Form.Label>How I Am Labeled</Form.Label>
                  <Form.Control
                    as="select"
                    name="howIAmLabeled"
                    value={formData?.tab1?.howIAmLabeled || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  >
                    <option value="">Select an option</option>
                    <option value="1">I am the campaigner</option>
                    <option value="2">I am the beneficiary</option>
                  </Form.Control>
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.howIAmLabeled}
                </p>

                <Form.Group>
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountHolderName"
                    placeholder="Enter account holder name"
                    value={formData.tab1.accountHolderName || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.accountHolderName}
                </p>
                <Form.Group>
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={formData.tab1.accountNumber || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.accountNumber}
                </p>
                <Form.Group>
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    placeholder="Enter bank name"
                    value={formData.tab1.bankName || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.bankName}
                </p>
                <Form.Group>
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    value={formData.tab1.ifscCode || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.ifscCode}
                </p>
                <Form.Group>
                  <Form.Label>SWIFT Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="SwiftCode"
                    placeholder="SWIFT Code"
                    value={formData.tab1.SwiftCode || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.SwiftCode}
                </p>
                <Form.Group>
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    value={formData.tab1.reason || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.reason}
                </p>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    value={formData.tab1.mobileNumber || ""}
                    onChange={(event) => handleInputChange(event, "tab1")}
                    max={1111111111}
                  />
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab1.mobileNumber}
                </p>
                <Form.Group>
                  <Form.Label>Cancelled Cheque</Form.Label>
                  <Form.Control
                    type="file"
                    name="document"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => handleInputChange(event, "tab1")}
                  />

                  <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                    {validationErrors.tab1.document}
                  </p>
                  <p>Upload Cancelled Cheque (PDF, JPG, JPEG, PNG).</p>
                </Form.Group>
                {/* Add four more input fields here */}
              </Form>
              {/* Add more input fields as needed */}
            </Tab>
            <Tab eventKey="tab2" title="Hospital">
              <Form>
                <Form.Group className="">
                  <Form.Label>Select Hospital</Form.Label>
                  <Form.Control
                    as="select"
                    name="selectedHospital"
                    value={formData.tab2.selectedHospital}
                    onChange={(event) => handleInputChange(event, "tab2")}
                  >
                    <option value="New">New</option>

                    {hospitalList.map((element) => {
                      return (
                        <option value={element?.id}>{element?.name}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                {formData.tab2.selectedHospital == "New" ? (
                  <>
                    <Form.Group>
                      <Form.Label>Account Holder Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountHolderName"
                        placeholder="Enter account holder name"
                        value={formData.tab2.accountHolderName || ""}
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                    </Form.Group>

                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.accountHolderName}
                    </p>
                    <Form.Group>
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountNumber"
                        placeholder="Enter account number"
                        value={formData.tab2.accountNumber || ""}
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                    </Form.Group>

                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.accountNumber}
                    </p>
                    <Form.Group>
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="bankName"
                        placeholder="Enter bank name"
                        value={formData.tab2.bankName || ""}
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                    </Form.Group>

                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.bankName}
                    </p>
                    <Form.Group>
                      <Form.Label>IFSC Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="ifscCode"
                        placeholder="IFSC Code"
                        value={formData.tab2.ifscCode || ""}
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                    </Form.Group>

                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.ifscCode}
                    </p>
                    <Form.Group>
                      <Form.Label>SWIFT Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="SwiftCode"
                        placeholder="SWIFT Code"
                        value={formData.tab2.SwiftCode || ""}
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                    </Form.Group>
                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.SwiftCode}
                    </p>
                    <Form.Group>
                      <Form.Label>Hospital Account Slip</Form.Label>
                      <Form.Control
                        type="file"
                        name="document"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) => handleInputChange(event, "tab2")}
                      />
                      <p
                        style={{ color: "red", margin: "0", fontSize: "10px" }}
                      >
                        {validationErrors.tab2.document}
                      </p>
                      <p>Upload Hospital account slip (PDF, JPG, JPEG, PNG).</p>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    {/* ... other fields ... */}
                    <Form.Group>
                      <Form.Label>Select Hospitals</Form.Label>
                      <div className="hospital-lebel">
                        {existingHospitals.map((bank) => (
                          <div key={bank.id} className="hospital-entry">
                            <Form.Check
                              type="radio" // Change to radio type
                              id={`hospital-${bank.id}`}
                              label={bank.bank_name}
                              name="selectedBankAccounts" // Radio buttons should have the same name
                              value={bank.id}
                              checked={
                                formData?.tab2?.selectedBankAccounts == bank.id
                              } // Check if the value matches the selected hospital
                              onChange={(event) =>
                                handleInputChange(event, "tab2")
                              }
                            />
                            <div className="hospital-details">
                              <p>Account Number: {bank.account_number}</p>
                              <p>IFSC Code: {bank.ifsc_code}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Form.Group>
                    <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                      {validationErrors.tab2.selectedBankAccounts}
                    </p>
                    {/* ... other fields ... */}
                  </>
                )}

                {/* Add four more input fields here */}
              </Form>
              {/* Add more input fields as needed */}
            </Tab>
            <Tab eventKey="tab3" title="Pharmacy">
              <Form>
                <Form.Group>
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountHolderName"
                    placeholder="Enter account holder name"
                    value={formData.tab3.accountHolderName || ""}
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab3.accountHolderName}
                </p>
                <Form.Group>
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={formData.tab3.accountNumber || ""}
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab3.accountNumber}
                </p>
                <Form.Group>
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    placeholder="Enter bank name"
                    value={formData.tab3.bankName || ""}
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab3.bankName}
                </p>
                <Form.Group>
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    value={formData.tab3.ifscCode || ""}
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                </Form.Group>
                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab3.ifscCode}
                </p>
                <Form.Group>
                  <Form.Label>SWIFT Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="SwiftCode"
                    placeholder="SWIFT Code"
                    value={formData.tab3.SwiftCode || ""}
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                </Form.Group>

                <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                  {validationErrors.tab3.SwiftCode}
                </p>
                <Form.Group>
                  <Form.Label> Pharmacy Account Slip</Form.Label>
                  <Form.Control
                    type="file"
                    name="document"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => handleInputChange(event, "tab3")}
                  />
                  <p>Upload Pharmacy account slip (PDF, JPG, JPEG, PNG).</p>
                  <p style={{ color: "red", margin: "0", fontSize: "10px" }}>
                    {validationErrors.tab3.document}
                  </p>
                </Form.Group>

                {/* Add four more input fields here */}
              </Form>
              {/* Add more input fields as needed */}
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="footer-hospital">
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          {activeTab !== "tab3" && (
            <Button onClick={handleSaveAndNext} variant="primary">
              Submit
            </Button>
          )}
          {activeTab === "tab3" && (
            <Button onClick={handleSaveAndNext} variant="primary">
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HospitalModel;
