import React from 'react';
import ForecastSection from "../ForecastSection/ForecastSection";

const SectionContainer = (props) => {

  return (
    <div>
      <div className="flex flex-col border-2 border-slate-300 rounded-md mt-8 mb-4">
        <div className="relative flex flex-col w-full h-full px-3 lg:px-4 pb-2 pt-4">
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
