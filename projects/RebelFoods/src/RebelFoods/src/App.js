import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./Pages/Employees/Employees";
import Header from "./Components/Header/Header";
import Campaigns from "./Pages/Campaigns/campaigns";
import Transactions from "./Pages/Transactions/Transactions";
import Payroll from "../src/Pages/Payroll/Payroll";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import GotoTo from "../src/Components/GotoTo/GotoTop";
import NotFound from "../src/Pages/PageNotFound/pageNotFound";
import Footer from "./Components/Footer/Footer";
import SideBarNew from "./Components/SidebarNew/sidebarNew";
import InProgress from "./Pages/InProgress/InProgress";
import MainHeader from "./Components/MainHeader/MainHeader";
import HomePage from "./Components/HomePage/HomePage";
import CampaignsDetails from "./Pages/CampaignsDetails/CampaignsDetails";
import SessionLogoutComponent from "./Components/SessionLogoutComponent/SessionLogoutComponent";

const App = () => {
  const storeToken = useSelector((state) => {
    return state.token;
  });

  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        {token ? (
          <>
            <Header />
            <SideBarNew>
              <Routes>
                <Route path="/" element={<Payroll />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route
                  path="/campaignsDetails"
                  element={<CampaignsDetails />}
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SessionLogoutComponent/>
              <GotoTo />
              <Footer />
            </SideBarNew>
          </>
        ) : (
          <>
            <MainHeader />
            <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin-login" element={<LoginPage />} />
                <Route path="/employee-login" element={<InProgress />} />
           
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
