import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiMoney ,BiVolumeLow } from "react-icons/bi";
import { BsFillPeopleFill, BsWalletFill } from "react-icons/bs";
import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import SidebarMenu from "./SidebarMenu";
import "./sidebarNew.scss";

const routes = [
  {
    path: "/",
    name: "Payroll",
    icon: <BiMoney />,
  },
 
  {
    path: "/campaigns" ,
    name: "Campaigns",
    icon: <BiVolumeLow/>,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: <BsWalletFill />,
  },
  {
    path: "/employees",
    name: "Employees",
    icon: <BsFillPeopleFill />,
  },
];

const SideBarNew = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container web">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "80px",

            transition: {
              duration: 0,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <div className="bars">
              {!isOpen ? (
                <>
                  <div style={{ marginLeft: "1rem" }}>
                    <  AiOutlineDoubleRight onClick={toggle} />
                  </div>
                </>
              ) : (
                <div className="d-flex collapes" onClick={toggle}>
                  <AiOutlineDoubleLeft onClick={toggle} style={{marginTop:"2px"}} />

                  <div className="collapes-text">Collapse</div>
                </div>
              )}
            </div>
          </div>

          <section className="routes ">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div
                    className="icon"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    {route.icon}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBarNew;
