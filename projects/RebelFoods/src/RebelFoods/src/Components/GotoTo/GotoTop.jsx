

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./GoTo.scss";


import arrow from "./images/toparrow.png";
const GotoTop = () => {


  let calcScrollValue = () => {

    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#52BAE6 ${scrollValue}%, #ffffff ${scrollValue}%)`;
  };
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;
  return (
    <div id="progress">
      <span id="progress-value"><img className="progress-img" src={ arrow }/></span>
    </div>
  );
};
export default GotoTop;
