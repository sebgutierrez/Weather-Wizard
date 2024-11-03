import React, { useState, useRef } from "react";

import TempCards from "../TempCards/TempCards";
import HistoricalChart from "../HistoricalChart/HistoricalChart";

const HistoricalSection = (props) => {
  return (
    <div className="flex flex-col w-full mb-2 mt-2 overflow-y-auto">
      <div className="flex w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-start sm:justify-between sm:align-bottom w-full">
          <h2 className="text-slate-600 font-bold text-left text-lg lg:text-2xl">
            Past Hourly Temperature
          </h2>
          <span className="text-slate-500 text-left text-md">
            {props.modelInfo.region}
          </span>
        </div>
      </div>
      <div className="my-2 px-0 h-px bg-slate-900/10"></div>
      <div className="flex w-full overflow-x-scroll lg:overflow-auto pt-2">
        <TempCards
          isCelsius={props.isCelsius}
          openWeatherData={props.openWeatherData}
        ></TempCards>
      </div>
      <div className="w-full overflow-x-scroll lg:overflow-auto mt-2">
        <HistoricalChart
          isCelsius={props.isCelsius}
          openWeatherData={props.openWeatherData}
        ></HistoricalChart>
      </div>
      {/* <p className="mt-6 text-black text-left">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p> */}
    </div>
  );
};
export default HistoricalSection;
