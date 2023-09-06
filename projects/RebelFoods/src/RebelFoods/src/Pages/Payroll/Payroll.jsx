import React from 'react'
import PayrollTable from '../../Components/PayrollTable/PayrollTable';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Transactions = () => {
  return (
    <>
   
     <PayrollTable/>
     <ToastContainer  position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
  </>
  )
}

export default Transactions