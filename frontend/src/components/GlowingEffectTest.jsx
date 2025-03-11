import React, { useState } from "react";
import { GlowingEffect } from "./ui/glowing-effect"; // Adjust path as needed

const GlowingEffectTest = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center w-64 h-64 bg-gray-800 text-white text-xl font-bold rounded-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🌟 Glowing Effect */}
      {isHovered && (
        <div className="absolute inset-0 z-0">
          <GlowingEffect
            blur={10}
            spread={30}
            variant="default"
            borderWidth={2}
            movementDuration={1.5}
          />
        </div>
      )}

      Hover Over Me!
    </div>
  );
};

export default GlowingEffectTest;
