import React, { useState } from "react";

import ForecastChart from "../ForecastChart/ForecastChart";
import ForecastList from "../ForecastList/ForecastList";

const ForecastSection = (props) => {
  const [view, setView] = useState("chart");
  const [modelName, setModelName] = useState({
    name: "AccuWeather",
  });

  const handleModelChange = (e) => {
    if (e.target.name == "model") {
      setModelName({
        name: e.target.value,
      });
    }
  };

  const handleViewChange = (e) => {
    if (e.target.name !== view) {
      setView(e.target.name);
    }
  };

  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-start sm:justify-between sm:align-bottom w-full">
          <h2 className="text-slate-600 font-bold text-left text-lg lg:text-2xl">
            Hourly Temperature Forecast
          </h2>
          <span className="text-slate-500 text-left text-md">
            {props.modelInfo.region}
          </span>
        </div>
      </div>
      <div className="my-2 px-0 h-px bg-slate-900/10"></div>
      <div className="flex w-full justify-end py-2">
        {view === "list" ? (
          <div className="flex px-2 lg:px-4">
            <select
              type="text"
              className="bg-white px-1 py-1 w-fit text-slate-500 hover:bg-gray-50 border-2 rounded-md cursor-pointer focus:outline-none"
              id="model"
              name="model"
              value={modelName.name}
              onChange={handleModelChange}
            >
              <option value="AccuWeather">AccuWeather</option>
              <option value="Long Short-Term Memory">Long Short-Term Memory</option>
            </select>
          </div>
        ) : null}
        {view === "chart" ? (
          <div className="inline-flex divide-x border-2 rounded-lg shadow-sm">
            <button
              className="text-white bg-[#2C74FF]/80 px-2 py-1 rounded-l-md hover:cursor-pointer"
              name="chart"
              onClick={handleViewChange}
            >
              Chart
            </button>
            <button
              className="text-gray-400 bg-white px-2 py-1 rounded-r-md hover:cursor-pointer"
              name="list"
              onClick={handleViewChange}
            >
              List
            </button>
          </div>
        ) : (
          <div className="inline-flex divide-x border-2 rounded-lg shadow-sm">
            <button
              className="text-gray-400 bg-white px-2 py-1 rounded-l-md hover:cursor-pointer"
              name="chart"
              onClick={handleViewChange}
            >
              Chart
            </button>
            <button
              className="text-white bg-[#2C74FF]/80 px-2 py-1 rounded-r-md hover:cursor-pointer"
              name="list"
              onClick={handleViewChange}
            >
              List
            </button>
          </div>
        )}
      </div>
      {view === "chart" ? (
        <div
          className="w-full overflow-x-visible pt-2"
          style={{ zIndex: "400" }}
        >
          <ForecastChart
            isCelsius={props.isCelsius}
            openWeatherData={props.openWeatherData}
            modelData={props.modelData}
          ></ForecastChart>
        </div>
      ) : (
        <ForecastList
          isCelsius={props.isCelsius}
          modelName={modelName}
          openWeatherData={props.openWeatherData}
          modelData={props.modelData}
        ></ForecastList>
      )}
      {/* <p className="hidden mt-6 text-black text-left">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p> */}
    </div>
  );
};
export default ForecastSection;
