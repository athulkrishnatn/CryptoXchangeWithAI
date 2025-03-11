import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Globe from "three-globe";

import globeData from "../../data/globe.json";

const GlobeComponent = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.arcsData(globeData);
    }
  }, []);

  return (
    <Canvas>
      <primitive object={new Globe()} ref={globeRef} />
    </Canvas>
  );
};

export default GlobeComponent;
