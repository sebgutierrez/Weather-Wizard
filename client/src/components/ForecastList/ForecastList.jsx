import React, { useState } from "react";

import TempRow from "../TempRow/TempRow";

const ForecastList = (props) => {
  return (
    <div className="flex w-full flex-col h-[40vh] mt-2">
      <div className="flex border-2 rounded-md overflow-y-auto">
        <TempRow
          isCelsius={props.isCelsius}
          modelName={props.modelName}
          openWeatherData={props.openWeatherData}
          modelData={props.modelData}
        ></TempRow>
      </div>
    </div>
  );
};

export default ForecastList;
