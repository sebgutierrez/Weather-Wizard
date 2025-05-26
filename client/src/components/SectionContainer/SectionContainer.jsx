import React, { useState } from "react";

import HistoricalSection from "../HistoricalSection/HistoricalSection";
import ModelSection from "../ModelSection/ModelSection";
import ForecastSection from "../ForecastSection/ForecastSection";

const SectionContainer = (props) => {

  return (
    <div className="flex flex-col border-2 border-slate-300 rounded-md mb-4 mt-2">
      <div className="flex flex-col">
        <div className="relative flex flex-col w-full h-full px-3 lg:px-4 py-2">
          <div className="flex items-center relative bg-white">
              <HistoricalSection
                className=""
                isCelsius={props.isCelsius}
                openWeatherData={props.openWeatherData}
                modelInfo={props.modelInfo}
                setModelInfo={props.setModelInfo}
              ></HistoricalSection>
            </div>
        </div>
      </div>
    </div>
  );
};
export default SectionContainer;
