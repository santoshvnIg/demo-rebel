import axios from "axios";
import { logoutApi, pagereload } from "./Constant";

{
  /*All RebelFood APIs are listed below */
}


let apiUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = process.env.REACT_APP_BACKEND_APP_URL_DEVELOPMENT;
} else if (process.env.NODE_ENV === "uat") {
  apiUrl = process.env.REACT_APP_BACKEND_APP_URL_UAT;
} else if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.REACT_APP_BACKEND_APP_URL_PROD;
} else {
  apiUrl = process.env.REACT_APP_BACKEND_APP_URL_PROD;
}
export class DataService {
  static backendEndPointUrl = apiUrl;

  // Login and Logout Api
  static LoginUser = async (data) => {
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/login`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  static LogoutApi = async (token) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/logout`,
        {},
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  // Payroll Api-- start--

  static UploadFileFund = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/csv-import`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static PayRollList = async (token, page) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/payrollQueue?page=${page}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static SearchPayRollList = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/donationList`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  // Payroll Api-- end--

  // Transaction Api-- start--
  static DonationList = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/donationList`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static TotalFundRaised = async (data, token) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/totalFundsRaised`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static Download18G = async (token, url) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(url, {}, headers);
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  // Transaction Api-- end--

  // Employees Api--start--
  static EmployeeLisList = async (token, page, value) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/employeeList?page=${page}&filter=${value}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static StatusChange = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/employeeUpdate`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static StatusUpdate = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/employeeList?status=${data}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static EmployeeSearch = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/employeeList?filter=${data}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  // EmployeeS Api--End--

  // Campaigns Api--start--
  static CampaignList = async (token, page, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };

    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/campaigns?partnerId=1&page=${page}&slug=${data}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static BankList = async (token, id) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/accounts?campaignId=${id}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static CampaignDetails = async (token, id) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/campaignDetails?campaignId=${id}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static CreateCampaign = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/createCampaign`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        return error.response;
      }
    }
  };

  static GetHospitalList = async (token, id) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/getHospital`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };
  static GetHospitalAccount = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/getHospitalAccounts`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static AddBankAccount = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/addBankAccount`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        logoutApi(token);
        pagereload();
        throw new Error("Login Again!!!");
      } else {
        return error.response;
      }
    }
  };

  //  Campaigns Api--end

  // Settlement Api--start
  static settlementList = async (token, id) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.get(
        `${DataService.backendEndPointUrl}/api/rebelfood/settlements?campaignId=${id}`,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        throw new Error("Something went wrong!!!");
      }
    }
  };

  static SettlementRequest = async (token, data) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Corrected property name with quotes
        Accept: "application/json", // Add the Accept header
      },
    };
    try {
      const response = await axios.post(
        `${DataService.backendEndPointUrl}/api/rebelfood/create-settlement`,
        data,
        headers
      );
      return response;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        // logoutApi(token);
        //     pagereload();
        throw new Error("Login Again!!!");
      } else {
        return error.response;
      }
    }
  };
  // settlement Api-- end
}
