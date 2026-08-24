import React from "react";

import linkedInSVG from "../../assets/linkedin.svg";
import APICard from "../Cards/APICard";
import MLCard from "../Cards/MLCard";
import ReactCard from "../Cards/ReactCard";
import TeamLeadCard from "../Cards/TeamLeadCard";

const Card = (props) => {
  return (
    <div className="min-w-md bg-white w-[300px] md:w-[400px] shadow-lg rounded-xl flex flex-col justify-between">
      <div className="relative px-6">
        <div className="flex flex-wrap justify-center align-center">
          <div className="w-full flex justify-center align-center">
            <div className="relative rounded-full">
              <img
                src={props.data.image}
                className="shadow-lg  max-w-[150px] max-h-[150px] rounded-full align-middle relative -m-16 lg:-ml-16"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-24">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            {props.data.name}
          </h3>
          <div className="text-s mt-0 mb-2 text-slate-400 font-bold">
            <i className="fas fa-map-marker-alt mr-2 text-slate-500 opacity-75">
              {props.data.year}
            </i>
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-center flex-wrap w-full gap-x-2 gap-y-2 px-0 h-full">
              <TeamLeadCard inTeam={props.data.teamLead}></TeamLeadCard>
              <ReactCard inTeam={props.data.reactTeam}></ReactCard>
              <APICard inTeam={props.data.apiTeam}></APICard>
              <MLCard inTeam={props.data.mlTeam}></MLCard>
            </div>
          </div>
        </div>
      </div>
      <div className="relative px-6 flex justify-center mb-6">
        <a
          href={props.data.profileLink}
          target="_blank"
          className="font-normal text-slate-700 hover:text-slate-400 flex justify-center"
        >
          <img src={linkedInSVG} alt="" className="align-middle inline relative" />
        </a>
      </div>
    </div>
  );
};

export default Card;
