import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./EmployeeModel.scss";
import { DataService } from "../Services/Dataservice";
import swal from "sweetalert";

function EmployeeModel(props) {
  const { show, setShow, data, setCallApi, callApi } = props;
  const [user, setUser] = useState(data);
  const handleClose = () => setShow(false);

  const token = localStorage.getItem("token");

  const handleSelectChange = (event) => {
    const name = event.target.name;
    setUser((user) => ({
      ...user,
      [name]: event.target.value,
    }));
  };

  // User Status change Api call
  const StatusChangeApi = (token, data) => {
    const statusChange = DataService.StatusChange(token, data);
    statusChange
      .then((res) => {
        if (res.status === 200) {
          setCallApi(!callApi);
          swal({
            icon: "success",
            title: `${res.data.message}`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "User details not updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  const handleSave = () => {
    StatusChangeApi(token, {
      uuid: user.uuid,
      status: user.status == "Active" ? 1 : 0,
    });
    handleClose();
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <>
      <Modal show={show} onHide={handleClose} id="EmployeeModel">
        <Modal.Header closeButton>
          <Modal.Title>Edit employee details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <Form className="p-3">
            <Form.Group
              className="mb-3"
              controlId="  EmployeeModelForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Name"
                name="name"
                autoFocus
                value={user.firstname}
                onChange={handleSelectChange}
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="  EmployeeModelForm.ControlInput1"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="emai"
                required
                name="email"
                placeholder="name@  EmployeeModel.com"
                autoFocus
                value={user.email}
                onChange={handleSelectChange}
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="  EmployeeModelForm.ControlInput1"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="Phone Number"
                placeholder="Phone Number"
                name="PhoneNo"
                autoFocus
                value={user.mobile}
                onChange={handleSelectChange}
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="  EmployeeModelForm.ControlInput1"
            >
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select   EmployeeModel"
                name="status"
                value={user.status}
                onChange={handleSelectChange}
              >
                {user.status == "Active" ? (
                  <>
                    <option value={"Active"}>Active</option>
                    <option value={"In-Active"}>Inactive</option>
                   
                  </>
                ) : (
                  <>
                    <option value={"In-Active"}>Inactive</option>
                    <option value={"Active"}>Active</option>
                   
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="close-button"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="save-button "
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeModel;
