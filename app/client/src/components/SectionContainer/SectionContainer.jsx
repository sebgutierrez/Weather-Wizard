import React from 'react';
import ForecastSection from "../ForecastSection/ForecastSection";

const SectionContainer = (props) => {

  return (
    <div className="flex flex-col border-2 border-slate-200 rounded-md mt-7 mb-4">
      <div className="relative flex flex-col w-full h-full px-3 lg:px-4 pb-0 pt-4">
        <div className="flex items-center relative bg-white min-h-[30vh]">
          {
            props.isLoadingData ? (
              <div className="absolute top-[calc(34%)] md:top-[calc(40%)] left-[calc(50%-58px)] text-black bg-white">
                Loading data...
              </div>
            ) : (
              <ForecastSection
                isLoadingData={props.isLoadingData}
                regionInfo={props.regionInfo} 
                setRegionInfo={props.setRegionInfo} 
                modelData={props.modelData} 
                apiData={props.apiData} 
                isCelsius={props.isCelsius}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};
export default SectionContainer;
