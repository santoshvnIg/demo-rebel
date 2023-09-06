import React, { useState } from "react";
import FundRisedCard from "../../Cards/FundRised";
import TransactionsTable from "../../Components/TransactionsTable/TransactionsTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GotoTop from "../../Components/GotoTo/GotoTop";
const Transactions = () => {
  return (
    <>
      <div
        className="d-lg-flex justify-content-start p-3"
        style={{ background: "rgb(248, 248, 248)" }}
      >
        <FundRisedCard />
      </div>
      <TransactionsTable />
      <ToastContainer position="top-right" autoClose={2000} />
      <GotoTop />
    </>
  );
};

export default Transactions;
