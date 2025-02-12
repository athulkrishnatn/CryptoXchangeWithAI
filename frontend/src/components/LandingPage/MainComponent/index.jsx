import React from "react";
import Button from "../../Common/Button/index";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import motion from 'framer-motion'


const MainComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start px-6 lg:px-12 py-8">
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-1">
        <motion.h1 
        className="text-white text-[5rem] lg:text-[6rem] font-extrabold ">
          Track Crypto
        </motion.h1>
        <motion.h1 
        className="text-blue-500 text-[5rem] lg:text-[6rem] font-extrabold">
          Real Time <span className="text-blue-500 text-[5rem] lg:text-[6rem] font-extrabold">.</span>
        </motion.h1>
        <motion.p className="text-gray-500 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque.
        </motion.p>
        <motion.div className="flex gap-6 mt-4">
          <Button text="Dashboard" className="flex-1" />
          <Button text="Share" outlined={true} className="flex-1" />
        </motion.div>
      </div>

      {/* Right Section - Phone Container */}
      <div className="relative w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img
          src={iphone}
          alt="iPhone"
          className="absolute z-10 w-1/2 max-w-xs lg:max-w-sm"
        />
        <img
          src={gradient}
          alt="Gradient Background"
          className="absolute top-16 right-50 w-2/5 max-w-xs lg:max-w-sm"
        />
      </div>
    </div>
  );
}

export default MainComponent;