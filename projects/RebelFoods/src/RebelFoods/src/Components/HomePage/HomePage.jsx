import React from "react";
import "./homePage.scss";
import img from "./homepage bg.png";

const HomePage = () => {
  return (
    <div className=" container-fluid home-page">
      <div className="row">
        <div className="col-lg-5 col-sm-12 text-box ">
          <span className="name-bold">SPARSH</span>
          <br />
          <br />
          Is a contributory welfare fund that essentially embodies the essence
          of life values through the spirit of giving the healing touch.
          Emerging from this sentiment, Rebels come together to celebrate a bond
          of belonging, standing firmly behind each other in times of need, and
          saying "We Care About You and Your Dear Ones".
          <br/>
          <br/>
           SPARSH is more than
          just a fund; it is a family that stands for compassion, supports its
          comrades, spreads care and love throughout the community. Join us in
          our journey of establishing solidarity to make a meaningful difference
          in the lives of those who matter most.
          <br/>
          <br/>
          Together, we aim to create a
          world where kindness and generosity know no bounds.
        </div>
        <div className="col-lg-7 col-sm-12 p-0 ">
          <img src={img} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
