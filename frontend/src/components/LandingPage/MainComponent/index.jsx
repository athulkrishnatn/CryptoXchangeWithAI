import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spotlight } from "../../ui/spotlight";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";

const MainComponent = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard"); // ✅ Redirect to dashboard if logged in
    } else {
      navigate("/login"); // ✅ Redirect to login if not logged in
    }
  };

  return (
    <Spotlight>
      <div className="text-center mt-[24rem] w-full h-screen">
        {/* Heading section */}
        <h1 className="text-6xl bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-clip-text text-transparent font-normal">
          Empower your trading decisions with <br /> 
          <span className="bg-gradient-to-r from-gray-400 via-white to-gray-700 bg-clip-text font-normal">
            Precision-driven intelligence
          </span>
        </h1>
        <h5 className="mt-2 text-lg text-gray-400">
          Harness AI-powered insights, real-time analytics, and predictive market <br />
          trends to stay ahead in the crypto landscape.
        </h5>

        {/* Buttons */}
        <div className="mt-5 flex justify-center items-center gap-9">
          <HoverBorderGradient as="button" className="rounded-2xl" onClick={handleGetStarted}>
            <span className="text-white cursor-pointer">Get started</span>
          </HoverBorderGradient>
        </div>
      </div>
    </Spotlight>
  );
};

export default MainComponent;
