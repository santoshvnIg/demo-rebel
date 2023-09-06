import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import "./FileUpload.scss";
import { useState } from "react";
import { DataService } from "../Services/Dataservice";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { saveAs } from "file-saver";
import file from "./payroll.csv";

const FileUpload = ({ show, setShow, Setapichange, apichange }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const lines = contents.split("\n");
        const isEmpty = lines.every((line) => line.trim() === "");

        if (isEmpty) {
          setErrorMessage("CSV file is empty");
          setSelectedFile(null);
        } else {
          setSelectedFile(file);
          // Process the CSV file further
        }
      };
      reader.readAsText(file);
      setErrorMessage("");
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a CSV file");
    }
  };
  //File Upload Api
  const fileUploadApi = (token, file) => {
    const response = DataService.UploadFileFund(token, file);
    toast
      .promise(response, {
        pending: "Uploading in process",
      })

      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          swal({
            icon: "success",
            title: "File Upload Successful!",
            text: "Your file has been uploaded successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          Setapichange(!apichange);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("somthing went wrong");
          swal({
            icon: "error",
            title: "No File Selected!",
            text: "Please select a file to upload.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
  };

  const handleFileSubmit = () => {
    if (selectedFile && errorMessage.length == 0) {
      const formData = {
        payroll_csv: selectedFile,
      };

      fileUploadApi(token, formData);
      setSelectedFile(null);
      setErrorMessage("");
      handleClose();
    } else if (errorMessage?.length == 0) {
      setErrorMessage("Please select a CSV file");
    }
  };
  //sample file download
  const handleDownload = () => {
    const filePath = `${file}`;
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, "payroll.csv");
      })
      .catch((error) => {});
  };
  return (
    <>
      <div>
        <Container className="file">
          <Modal show={show} onHide={handleClose} style={{ padding: "1rem" }}>
            <div className="p-4">
              <h>Add funds by uploading the bulk file</h>
              <br />
              <p1
                onClick={handleDownload}
                style={{ textDecoration: "auto" }}
                className="download"
              >
                Download the Sample File
              </p1>
              <div></div>
              <input
                type="file"
                id="fileUpload"
                className="file-upload-input mt-2"
                accept=".csv"
                onChange={handleFileChange}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <br />
              <br />
              <h6>Mandatory Columns for File Upload</h6>
              Name, Mobile, Employee Code, City, State, Pin Code, Address, PAN
              Card, Amount, Transaction Date
            </div>

            <Modal.Footer>
              <Button
                variant="primary"
                className="save-Button"
                onClick={handleFileSubmit}
              >
                Upload
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

export default FileUpload;
