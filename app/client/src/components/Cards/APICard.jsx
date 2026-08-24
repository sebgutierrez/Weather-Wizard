import React from "react";
import "./Cards.css";

const APICard = (props) => {
  if (props.inTeam) {
    return <div className="API-team">API Team</div>;
  } else {
    return null;
  }
};

export default APICard;
