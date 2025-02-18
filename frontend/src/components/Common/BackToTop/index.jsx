import React, { useState, useEffect } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import "./styles.css"; 

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`top-btn ${isVisible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ExpandLessRoundedIcon />
    </div>
  );
};

export default BackToTop;
