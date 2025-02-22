import React from "react";
import { Link } from "react-router-dom";

const MainComponent = () => {
  return (
    <div className="text-center mt-[10rem] w-full">
      {/*Heading section */}
      <div>
        <h1 className="text-6xl bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-clip-text text-transparent">
          Empower your trading decisions with <br /> 
          <span className="text-orange-400">Precision-driven intelligence</span>
        </h1>
        <h5 className="mt-2 text-lg text-gray-400">
          Harness AI-powered insights, real-time analytics, and predictive market <br /> 
          trends to stay ahead in the crypto landscape.
        </h5>
      </div>
      {/*Button*/}
      <div className="mt-5 flex justify-center items-center gap-9" >
      <Link to={'/dashboard'}  className="  p-2 rounded-2xl text-white border-white-2 hover:underline ">Learn More</Link>
        <Link to={'/dashboard'}  className="px-3 py-2 rounded-2xl text-white bg-orange-600 hover:bg-amber-800 ">Get started</Link>
      </div>
    </div>
  );
}

export default MainComponent;
