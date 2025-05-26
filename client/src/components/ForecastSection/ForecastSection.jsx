import React, { useState } from "react";

import ForecastChart from "../ForecastChart/ForecastChart";
import ForecastList from "../ForecastList/ForecastList";

const ForecastSection = (props) => {
  const [view, setView] = useState("chart");

  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-start sm:justify-between sm:align-bottom w-full">
          <h2 className="text-slate-600 font-bold text-left text-lg lg:text-2xl">
            24-Hour Forecast
          </h2>
          <span className="text-slate-500 text-left text-md">
            {props.modelInfo.region}
          </span>
        </div>
      </div>
      <div className="my-2 px-0 h-px bg-slate-900/10"></div>
    </div>
  );
};
export default ForecastSection;
