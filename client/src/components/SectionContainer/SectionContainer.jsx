import React, { useState } from "react";

import HistoricalSection from "../HistoricalSection/HistoricalSection";
import ModelSection from "../ModelSection/ModelSection";
import ForecastSection from "../ForecastSection/ForecastSection";

const SectionContainer = (props) => {
  const [isCelsius, setIsCelsius] = useState(false);

  const [displaySelected, setDisplaySelected] = useState("12hr");
  const [labelSelected, setLabelSelected] = useState("12hr");

  function flipIsCelsius() {
    setIsCelsius((isCelsius) => !isCelsius);
  }

  const changeDisplay = (e) => {
    setDisplaySelected(e.target.dataset.display); // '12hr', 'forecast', 'model'
    setLabelSelected(e.target.dataset.display); // '12hr', 'forecast', 'model'
  };

  const changeSelect = (e) => {
    setDisplaySelected(e.target.value); // '12hr', 'forecast', 'model'
    setLabelSelected(e.target.value); // '12hr', 'forecast', 'model'
  };

  return (
    <div className="flex flex-col border-2 rounded-md mx-4 md:mx-6 mb-4">
      <div className="flex flex-col">
        <ul className="relative w-full flex justify-between items-center border-b-2 py-2 md:py-0 md:pt-4">
          <div className="hidden md:flex md:gap-x-10 pl-3 mt-0 md:mt-3.5">
            {labelSelected === "12hr" ? (
              <li
                className="text-[#2C74FF] shadow-[0_2px_0_rgba(44,116,255,1.0)] text-xl inline-flex flex-col cursor-pointer"
                data-display="12hr"
                onClick={changeDisplay}
              >
                Last 12 Hours
              </li>
            ) : (
              <li
                className="text-slate-400 hover:text-[#2C74FF]/50 hover:shadow-[0_2px_0_rgba(44,116,255,0.5)] text-xl cursor-pointer"
                data-display="12hr"
                onClick={changeDisplay}
              >
                Last 12 Hours
              </li>
            )}
            {labelSelected === "forecast" ? (
              <li
                className="text-[#2C74FF] shadow-[0_2px_0_rgba(44,116,255,1.0)] text-xl inline-flex flex-col cursor-pointer"
                data-display="forecast"
                onClick={changeDisplay}
              >
                Forecast
              </li>
            ) : (
              <li
                className="text-slate-400 hover:text-[#2C74FF]/50 hover:shadow-[0_2px_0_rgba(44,116,255,0.5)] text-xl cursor-pointer"
                data-display="forecast"
                onClick={changeDisplay}
              >
                Forecast
              </li>
            )}
            {/* {
							labelSelected === 'model'   ?
														(<li className="text-[#2C74FF] shadow-[0_2px_0_rgba(44,116,255,1.0)] text-xl inline-flex flex-col cursor-pointer" 
															data-display="model" 
															onClick={changeDisplay}
															>Model</li>)
														:
														(<li className="text-slate-400 hover:text-[#2C74FF]/50 hover:shadow-[0_2px_0_rgba(44,116,255,0.5)] text-xl cursor-pointer" 
															data-display="model" 
															onClick={changeDisplay}
															>Model</li>)
						} */}
          </div>
          <div className="flex md:hidden pl-3">
            <select
              type="text"
              className="bg-white px-1 py-1 w-fit text-lg text-slate-500 hover:bg-gray-50 border-2 rounded-md cursor-pointer focus:outline-none"
              id="displaySelect"
              name="displaySelect"
              value={displaySelected}
              onChange={changeSelect}
            >
              <option value="yesterday">Yesterday</option>
              <option value="forecast">Forecast</option>
              {/* <option value="model">Model</option> */}
            </select>
          </div>
          <div className="pr-3 mb-0 md:mb-1" onClick={flipIsCelsius}>
            {isCelsius ? (
              <button className="text-slate-500 text-xl border-2 rounded-md p-1 px-2">
                &deg;C
              </button>
            ) : (
              <button className="text-slate-500 text-xl border-2 rounded-md p-1 px-2">
                &deg;F
              </button>
            )}
          </div>
        </ul>
        <div className="relative flex flex-col w-full h-full px-3 lg:px-4 py-2">
          {displaySelected === "12hr" ? (
            <div className="flex items-center relative bg-white">
              <HistoricalSection
                className=""
                isCelsius={isCelsius}
                openWeatherData={props.openWeatherData}
                modelInfo={props.modelInfo}
                setModelInfo={props.setModelInfo}
              ></HistoricalSection>
            </div>
          ) : null}
          {displaySelected === "forecast" ? (
            <div className="flex items-center relative bg-white">
              <ForecastSection
                className=""
                isCelsius={isCelsius}
                openWeatherData={props.openWeatherData}
                modelData={props.modelData}
                modelInfo={props.modelInfo}
                setModelInfo={props.setModelInfo}
              ></ForecastSection>
            </div>
          ) : null}
          {/* {
						displaySelected === 'model' ?
														(<div className="flex items-center relative bg-white">
															<ModelSection className="" modelInfo={props.modelInfo} setModelInfo={props.setModelInfo}></ModelSection>
														</div>)
													:
														(null)
					} */}
        </div>
      </div>
    </div>
  );
};
export default SectionContainer;
