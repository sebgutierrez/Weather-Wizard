import React from 'react';
import ForecastChart from "../ForecastChart/ForecastChart";

function toMMDDYYYY(date){
  let year = date.slice(0,4)
  let month = Number(date.slice(5,7))
  let day = Number(date.slice(8))

  return month + "/" + day.toString() + "/" + year.toString()
}

const ForecastSection = (props) => {
  let forecastDate = toMMDDYYYY(props.modelData.metadata.timestamps[0].slice(0,10))

  return (
    <div className="flex flex-col w-full" style={{overflowX: "visible", overflowY: "visible"}}>
      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-start sm:justify-between sm:align-bottom w-full">
          <div className="flex justify-between sm:justify-start items-end">
            <h2 className="text-slate-600 font-bold text-left text-md md:text-lg lg:text-2xl">
              Hourly Forecast
            </h2>
            <span className="text-slate-500 text-sm md:text-base pb-0.5 pl-2">{forecastDate}</span>
          </div>
          <span className="text-slate-500 text-left text-md pb-0.5 pr-[12px]">
            {props.regionInfo.region}
          </span>
        </div>
      </div>
      <div className="w-full overflow-x-scroll ml-4 lg:ml-1" style={{overflowX: "visible", overflowY: "visible"}}>
        <ForecastChart
          regionInfo={props.regionInfo} 
          modelData={props.modelData} 
          apiData={props.apiData} 
          isCelsius={props.isCelsius}
        />
      </div>
    </div>
  );
};
export default ForecastSection;
