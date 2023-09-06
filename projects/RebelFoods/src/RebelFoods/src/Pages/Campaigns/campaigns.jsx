import React from "react";
import FundRisedCard from "../../Cards/FundRised";
import CampaignTable from "../../Components/CampaignsList/CampaignTable";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const campaigns = () => {
  return (
    <>
      <div className="d-flex justify-content-start p-3">
        <FundRisedCard />
      </div>
    
      <CampaignTable/>
      <ToastContainer  position="top-right"
        autoClose={2000}
       />
    
    </>
  );
};

export default campaigns;
