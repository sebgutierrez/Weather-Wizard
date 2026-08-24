import React from "react";
import "./Cards.css";

const ReactCard = (props) => {
  if (props.inTeam) {
    return <div className="React-team">React Team</div>;
  } else {
    return null;
  }
};

export default ReactCard;
