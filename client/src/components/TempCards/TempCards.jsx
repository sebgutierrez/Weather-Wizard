import React, { useState, useRef, useEffect } from "react";

const TempCards = (props) => {

  let listItems = [];

  if (props.isCelsius) {
    listItems = props.openWeatherData.c.map((temp, key) => {
      let rawTimeString = new Date(temp[0]).toLocaleTimeString()
      let timeString = rawTimeString.length === 11 ? rawTimeString.slice(0,2) + " " + rawTimeString.slice(-2) : rawTimeString.slice(0,1) + " " + rawTimeString.slice(-2)
      return (
        <li
          className="flex flex-col justify-center items-center relative min-w-[120px] px-6 py-8 rounded-md bg-[#2C74FF]"
          key={key}
        >
          <span className="text-white absolute top-2 left-2 text-left">
            {timeString}
          </span>{" "}
          <span className="text-white font-bold text-2xl pt-2">
            {temp[1].toFixed(1)}&deg;C
          </span>
        </li>
      );
    });
  } else {
    listItems = props.openWeatherData.f.map((temp, key) => {
      let rawTimeString = new Date(temp[0]).toLocaleTimeString()
      let timeString = rawTimeString.length === 11 ? rawTimeString.slice(0,2) + " " + rawTimeString.slice(-2) : rawTimeString.slice(0,1) + " " + rawTimeString.slice(-2)
      return (
        <li
          className="flex flex-col justify-center items-center relative min-w-[120px] px-6 py-8 rounded-md bg-[#2C74FF]"
          key={key}
        >
          <span className="text-white absolute top-2 left-2 text-left">
            {timeString}
          </span>
          <span className="text-white font-bold text-2xl pt-2">
            {temp[1].toFixed(1)}&deg;F
          </span>
        </li>
      );
    });
  }

  return (
    <div className="flex w-full">
      <ol
        className="grid grid-flow-col justify-stretch gap-x-2 w-full"
      >
        {listItems}
      </ol>
    </div>
  );
};
export default TempCards;
