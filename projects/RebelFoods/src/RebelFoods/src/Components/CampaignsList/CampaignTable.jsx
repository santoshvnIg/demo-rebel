import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./campaignTable.scss";
import SkeletonTable from "../../Common/SkeletonTable";
import { DataService } from "../../Services/Dataservice";
import { FaHandHoldingUsd } from "react-icons/fa";
import { toast } from "react-toastify";
import FileUpload from "../../Model/FileUpload";
import { AiFillEye } from "react-icons/ai";
import { BiBookBookmark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SettelmentModel from "../../Model/SettelmentModel";
import CampaignsModel from "../../Model/CampaignsModel";
import HospitalListModel from "../../Model/HospitalListModel";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import NgomodelFormModal from "../../Model/NgoModel";
import Pagination from "../Pagination/Pagination";

function TransactionsTable() {
  const [Campaigns, setCampaigns] = useState(null);
  const [searchvalue, SetSearchvalue] = useState("");
  const [togal, setTogal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showcamp, setShowcamp] = useState(false);
  const [onshow, setOnshow] = useState(false);
  const [uuid, setUuid] = useState("");
  const [typeCampaigns, setTypeCampaigns] = useState(1);
  const [CampaignId, SetCampaignId] = useState("");
  const [page, setPage] = useState(1);
  const [searial, setSerial] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handlePrevClick = () => {
    if (page - 1 > 0) setPage((prevPage) => prevPage - 1);
    return null;
  };

  const handleNextClick = () => {
    // if (page + 1 <= ?Campaigns.last_page) setPage((prevPage) => prevPage + 1);
    return null;
  };

  const handlePageClick = (e) => {
    setPage(parseInt(e.target.innerText, 10));
  };
  // Campign listing Api call
  const CampaignListApi = (token, page, data) => {
    setIsLoading(true);
    const CampaignList = DataService.CampaignList(token, page, data);
    toast
      .promise(
        CampaignList,

        {
          pending: "Waiting for the respose",
        }
      )
      .then((res) => {
        if (res?.status == 200) {
          // toast.success("Updated successfully");
        }
        setCampaigns(res?.data?.data);
        setPage(res?.data?.data?.current_page);
        setSerial(res?.data?.data?.from);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error) {
          // toast.error("Somthing went wrong");
          setIsLoading(false);
        }
      });
  };

  const handleFilterChange = (e) => {
    let searchInput = e.target.value;
    SetSearchvalue(searchInput);
  };

  const handleFilterClick = () => {
    if (togal === true) {
      CampaignListApi(token, "", searchvalue);
    } else if (togal === false) {
      CampaignListApi(token, "", "");
      SetSearchvalue("");
    }
    setTogal(!togal);
  };

  const handleActive = (id) => {
    navigate(`/campaignsDetails?id=${id}`);
  };

  const handleEdite = (id) => {
    SetCampaignId(id);
    setShow(true);
  };
  const handleBank = (id, type) => {
    setUuid(id);
    setTypeCampaigns(type);
    setShowcamp(true);
  };
  const handlecampaign = (e) => {
    setTypeCampaigns(e);
    setOnshow(true);
  };
  const callApi=()=>{
    CampaignListApi(token, page, searchvalue);
  }
  useEffect(() => {
    CampaignListApi(token, page, searchvalue);
  }, [page]);

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="main" id="campaigntable">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex ">
                <InputGroup size="sm" className="mb-3">
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Search by Slug title"
                    style={{ background: "#F2F2F2", height: "40px" }}
                    onChange={handleFilterChange}
                    value={searchvalue}
                  />
                </InputGroup>
                <div>
                  <button
                    onClick={handleFilterClick}
                    className="filtername"
                    style={{ marginLeft: "1rem" }}
                  >
                    {togal ? "Apply Filter" : "Clear"}
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {/* <p className="addFunds p-2" onClick={}>
                  + Start A campaign
                </p> */}
                <DropdownButton
                  id="dropdown-basic-button"
                  title=" + Start A Campaign"
                  onSelect={handlecampaign}
                  value={typeCampaigns}
                >
                  <Dropdown.Item eventKey={5}>Hospital</Dropdown.Item>
                  <Dropdown.Item eventKey={1}>NGO</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>

            <div className="d-flex  justify-content-between"></div>
            <div
              className={`overflow-auto ${
                Campaigns?.data?.length < 5
                  ? "table-height"
                  : "table-height-auto"
              } `}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Slug Title</th>
                    <th>Goal Amount</th>

                    <th>Settled Amount</th>
                    <th>Status</th>
                    <th>Settlement Request</th>
                    <th>Add Bank Account</th>
                    <th style={{ width: "10rem" }}> Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {Campaigns?.data?.map((element, i) => {
                    return (
                      <tr>
                        <td className="align-items-center text-break">
                          {searial + i}
                        </td>
                        <td
                          className="align-items-center text-break"
                          style={{ textAlign: "start !important" }}
                        >
                          {element?.slug_title}
                        </td>

                        <td className="align-items-center text-break">
                          {element?.goal_amount}
                        </td>
                        <td className="align-items-center text-break">
                          {element?.total_settled_amount}
                        </td>
                        <td className="align-items-center text-break">
                          {element?.approve_status}
                        </td>
                        {element?.type == 15 ? (
                          <td></td>
                        ) : (
                          <td className="" style={{ cursor: "pointer" }}>
                            <FaHandHoldingUsd
                              className="icone-size"
                              onClick={() => {
                                handleEdite(element?.id);
                              }}
                            />
                            &nbsp;&nbsp;
                          </td>
                        )}

                        {element?.type == 15 ? (
                          <td></td>
                        ) : (
                          <td className="" style={{ cursor: "pointer" }}>
                            <BiBookBookmark
                              className="icone-size"
                              onClick={() => {
                                handleBank(
                                  element?.uuid,
                                  element?.beneficiary_type
                                );
                              }}
                            />
                          </td>
                        )}

                        <td className="" style={{ cursor: "pointer" }}>
                          <AiFillEye
                            className="icone-size"
                            onClick={() => {
                              handleActive(element?.id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                data={Campaigns}
                page={page}
                handlePageClick={handlePageClick}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                isLoading={isLoading}
              />
            </div>
          </div>
          <CampaignsModel
            show={onshow}
            setShow={setOnshow}
            typeCampaigns={typeCampaigns}
            callApi={callApi}
            
          />

          {show && (
            <SettelmentModel
              show={show}
              setShow={setShow}
              CampaignId={CampaignId}
              typeCampaigns={typeCampaigns}
            />
          )}
          <FileUpload />
          {typeCampaigns === 5 ? (
            showcamp && (
              <HospitalListModel
                show={showcamp}
                setShow={setShowcamp}
                uuid={uuid}
              />
            )
          ) : (
            <NgomodelFormModal
              show={showcamp}
              setShow={setShowcamp}
              uuid={uuid}
            />
          )}
          {}
        </>
      )}
    </>
  );
}

export default TransactionsTable;
