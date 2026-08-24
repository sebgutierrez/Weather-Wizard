import React from "react";
import "./Cards.css";

const MLCard = (props) => {
  if (props.inTeam) {
    return <div className="ML-team">ML Team</div>;
  } else {
    return null;
  }
};

export default MLCard;
