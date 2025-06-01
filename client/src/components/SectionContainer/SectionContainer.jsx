import React from 'react';
import ForecastSection from "../ForecastSection/ForecastSection";

const SectionContainer = (props) => {

  return (
    <div>
      <h2 className="text-slate-700 text-xl text-left mt-8">Temperature Chart</h2>
      <div className="w-full mt-3 mb-6 px-0 h-px bg-slate-900/5"></div>
      <div className="flex flex-col border-2 border-slate-300 rounded-md mb-4">
        <div className="relative flex flex-col w-full h-full px-3 lg:px-4 py-2">
          <div className="flex items-center relative bg-white">
            <ForecastSection
              isCelsius={props.isCelsius}
              apiData={props.apiData}
              regionName={props.modelInfo.region}
              setModelInfo={props.setModelInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionContainer;
