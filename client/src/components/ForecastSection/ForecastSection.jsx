import React from 'react';
import ForecastChart from "../ForecastChart/ForecastChart";

const ForecastSection = (props) => {
  
  return (
    <div className="flex flex-col w-full mb-2 mt-2 overflow-y-auto">
      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-start sm:justify-between sm:align-bottom w-full">
          <div className="flex items-end">
            <h2 className="text-slate-600 font-bold text-left text-md md:text-lg lg:text-2xl">
              Hourly Forecast
            </h2>
            <span className="text-slate-500 pb-0.5 pl-2">5/25/2025</span>
          </div>
          <span className="text-slate-500 text-left text-md pb-0.5">
            {props.regionName}
          </span>
        </div>
      </div>
      <div className="my-2 px-0 h-px bg-slate-900/10"></div>
      <div className="w-full overflow-x-scroll lg:overflow-auto">
        <ForecastChart
          isCelsius={props.isCelsius}
          apiData={props.apiData}
          regionName={props.regionName}
        ></ForecastChart>
      </div>
    </div>
  );
};
export default ForecastSection;
