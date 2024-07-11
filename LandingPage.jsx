import React, { useState } from "react";
import "../assets/styling/LandingPage.css";
import featureImg1 from "../assets/images/simplicity.png";
import featureImg2 from "../assets/images/virtualdom.png";
import featureImg3 from "../assets/images/resuable.png";
import featureImg4 from "../assets/images/performance.png";
import Typewriter from "typewriter-effect";

function LandingPage() {
  return (
    <div className="main-container">
      {/* banner-image */}
      <div className="introduction-section">
        <div className="intro-container">
          <div id="heading-main">
            {/* included typewriter for dynamic heading */}
            <Typewriter
              options={{
                strings: ["Hello", "Welcome React....!"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="banner-content">
            <p>
              React is a free and open-source front-end JavaScript library for
              building user interfaces based on components. It is maintained by
              Meta and a community of individual developers and companies. React
              can be used to develop single-page, mobile, or server-rendered
              applications with frameworks like Next.js
            </p>
          </div>
          <div className="banner-btn-container">
            <button className="banner-btn"> Read More</button>
          </div>
        </div>
      </div>
      <div className="sub-section-container">
        <div className="card-main-container">
          <div className="card-heading"> Features of ReactJs</div>
        </div>
        <div className="card-container">
          <div className="card-container-section">
            <div className="feature-img">
              <img src={featureImg1} height="100px" />
            </div>
            <div className="feature-content">
              <p>Simple to understand</p>
            </div>
          </div>
          <div className="card-container-section">
            <div className="feature-img">
              <img src={featureImg2} height="100px" />
            </div>
            <div className="feature-content">
              <p>Uses Virtual Dom</p>
            </div>
          </div>
          <div className="card-container-section">
            <div className="feature-img">
              <img src={featureImg3} height="100px" />
            </div>
            <div className="feature-content">
              <p>Reusable Code</p>
            </div>
          </div>
          <div className="card-container-section">
            <div className="feature-img">
              <img src={featureImg4} height="100px" />
            </div>
            <div className="feature-content">
              <p>Highly Efficient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
