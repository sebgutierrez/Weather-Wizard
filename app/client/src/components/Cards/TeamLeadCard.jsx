import React from "react";
import "./Cards.css";

const TeamLeadCard = (props) => {
  if (props.inTeam) {
    return <div className="Team-lead">Team Lead</div>;
  } else {
    return null;
  }
};

export default TeamLeadCard;
