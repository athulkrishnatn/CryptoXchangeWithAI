import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spotlight } from "../../ui/spotlight";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import { motion } from "framer-motion";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MainComponent = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard"); 
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }


  return (
    <Spotlight  className="mt-[-50px] ml-[-50px]">
      <div className="text-center mt-[27rem] w-full h-screen">
        {/* Heading section */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-clip-text text-transparent font-light leading-snug opacity-90">
          Empower your trading decisions with <br />
          <span className="bg-gradient-to-r from-gray-400 via-white to-gray-500 bg-clip-text font-light leading-snug opacity-90">
            Precision-driven intelligence
          </span>
        </h1>
        <h5 className="mt-2 sm:text-lg font-extralight text-gray-400">
          Harness AI-powered insights, real-time analytics, and predictive market <br />
          trends to stay ahead in the crypto landscape.
          <p className= "  b text-gray-100 font-extralight  mt-3 text-sm ms-3 cursor-pointer hover:underline-offset-1   relative z-10 ">Learn More <ChevronRightIcon/> </p>
        </h5>

        {/* Buttons */}
        <div className="mt-5 flex justify-center items-center gap-5">
         
            
           
            
        

          <HoverBorderGradient as="button" className="rounded-2xl" onClick={handleGetStarted}>
            <span className="text-white cursor-pointer font-light">Get started</span>
          </HoverBorderGradient>

          
        </div>
      
        
      </div>
     
      <hr className="border-gray-500" />
     
    </Spotlight>
  );
};

export default MainComponent;
