import React from "react";
import { Link } from "react-router-dom";
import { Spotlight } from "../../ui/spotlight";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";

const MainComponent = () => {
  return (
    <Spotlight>
      <div className="text-center mt-[24rem] w-full h-screen">
        {/* Heading section */}
        <h1 className="text-6xl bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-clip-text text-transparent font-normal">
          Empower your trading decisions with <br /> 
          <span className="bg-gradient-to-r from-gray-400 via-white to-gray-700 bg-clip-text font-normal  ">Precision-driven intelligence</span>
        </h1>
        <h5 className="mt-2 text-lg text-gray-400">
          Harness AI-powered insights, real-time analytics, and predictive market <br />
          trends to stay ahead in the crypto landscape.
        </h5>

        {/* Buttons */}
        <div className="mt-5 flex justify-center items-center gap-9">
        <HoverBorderGradient as="div" className="rounded-2xl">
           <Link to="/dashboard" className=" text-white ">
            Get started
          </Link>
        </HoverBorderGradient>

        </div>
      </div>
    </Spotlight>
  );
};

export default MainComponent;
