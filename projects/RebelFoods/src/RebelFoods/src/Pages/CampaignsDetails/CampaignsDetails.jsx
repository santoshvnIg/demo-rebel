import React, { useState, useEffect } from "react";
import { DataService } from "../../Services/Dataservice";
import "./campaignsDetails.scss";
import Skeleton from "react-loading-skeleton";

const SideBySidePage = () => {
  const [settelmentDetails, setSettelmentDetails] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const token = localStorage.getItem("token");

  // Settlement Detail Api
  const settelmentDataApi = (token, id) => {
    const settelment = DataService.settlementList(token, id);
    settelment
      .then((response) => setSettelmentDetails(response.data.data))
      .catch((error) => {});
  };
  // Campaign Detail Api
  const campaignDetailsApi = (token, id) => {
    const settelment = DataService.CampaignDetails(token, id);
    settelment
      .then((response) => setCampaignDetails(response.data.data))
      .catch((error) => {});
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    // Get the 'id' parameter from the query parameters
    const id = queryParams.get("id");
    settelmentDataApi(token, id);
    campaignDetailsApi(token, id);
  }, []);

  return (
    <div className="side-by-side-container">
      <div className="details-side">
        <div className="row break-word-text">
          <h4 className="mb-3"> Campaign Details</h4>
          <br />

          <div className="row mb-3 list-settelment">
            <div className="col-lg-6 col-md-12">
              <p>
                <span className="bold-list">Campaign Title : </span>{" "}
                {campaignDetails?.title ? (
                  campaignDetails?.title
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
              <p>
                <span className="bold-list">Slug Title :</span>{" "}
                {campaignDetails?.slug_title ? (
                  campaignDetails?.slug_title
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
              <p>
                <span className="bold-list">Goal Amount :</span> &#x20B9;{" "}
                {campaignDetails?.goal_amount ? (
                  campaignDetails?.goal_amount
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
              <p>
                <span className="bold-list">Beneficiary Name :</span>{" "}
                {campaignDetails?.beneficiary?.name ? (
                  campaignDetails?.beneficiary?.name
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
              <p>
                <span className="bold-list">Beneficiary Mobile : </span>
                {campaignDetails?.beneficiary?.phone ? (
                  campaignDetails?.beneficiary?.phone
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
              <p>
                <span className="bold-list">Beneficiary Email :</span>{" "}
                {campaignDetails?.beneficiary?.email ? (
                  campaignDetails?.beneficiary?.email
                ) : (
                  <Skeleton width={300} />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="settlement-side">
        <div className="row break-word-text">
          <h4 className="mb-3">Settlement Details</h4>
          <br />
          {settelmentDetails?.length > 0 ? (
            settelmentDetails?.map((element) => {
              return (
                <>
                  <div className="row mb-3 list-settelment">
                    <div className="col-lg-6 col-md-12">
                      <p>
                        <span className="bold-list">Settlement ID: </span>
                        {element?.id ? element?.id : <Skeleton width={300} />}
                      </p>

                      <p>
                        <span className="bold-list">Requested Amount: </span>{" "}
                        &#x20B9;{" "}
                        {element?.requested_amount ? (
                          element?.requested_amount
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </p>
                      <p>
                        <span className="bold-list">Settled Amount: </span>{" "}
                        &#x20B9;{" "}
                        {element?.settled_amount ? (
                          element?.settled_amount
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <p>
                        <span className="bold-list">Settlement Date: </span>
                        {element?.settlementRequestDate ? (
                          element?.settlementRequestDate
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </p>
                      <p>
                        <span className="bold-list">Setteled Date: </span>{" "}
                        {element?.settledDate ? (
                          element?.settledDate
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </p>
                      <p>
                        <span className="bold-list">Settlement Status: </span>{" "}
                        {element?.settlementStatus ? (
                          element?.settlementStatus
                        ) : (
                          <Skeleton width={300} />
                        )}
                      </p>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p>No Settlement Details found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBySidePage;
