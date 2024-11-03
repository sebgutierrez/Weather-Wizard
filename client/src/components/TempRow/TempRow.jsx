import React from "react";

const TempRow = (props) => {
  let listItems = [];
  let keyVal = 0;
  if (props.isCelsius) {
    if (props.modelName.name === "AccuWeather") {
      listItems = props.openWeatherData.c.slice(0, 7).map((temp, key) => {
        keyVal += 1;
        if (temp[1] !== null) {
          if (keyVal % 2 === 0) {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
              </li>
            );
          } else {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
              </li>
            );
          }
        }
      });
      listItems = [
        ...listItems,
        props.openWeatherData.c.slice(7).map((temp, key) => {
          keyVal += 1;
          if (temp[1] !== null) {
            if (keyVal % 2 === 0) {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
                </li>
              );
            } else {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
                </li>
              );
            }
          }
        }),
      ];
    } else if (props.modelName.name === "Long Short-Term Memory") {
      listItems = props.modelData.c.slice(0, 7).map((temp, key) => {
        keyVal += 1;
        if (temp[1] !== null) {
          if (keyVal % 2 === 0) {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
              </li>
            );
          } else {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
              </li>
            );
          }
        }
      });
      listItems = [
        ...listItems,
        props.modelData.c.slice(7).map((temp, key) => {
          keyVal += 1;
          if (temp[1] !== null) {
            if (keyVal % 2 === 0) {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
                </li>
              );
            } else {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;C</span>
                </li>
              );
            }
          }
        }),
      ];
    }
  } else {
    if (props.modelName.name === "AccuWeather") {
      listItems = props.openWeatherData.f.slice(0, 7).map((temp, key) => {
        keyVal += 1;
        if (temp[1] !== null) {
          if (keyVal % 2 === 0) {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
              </li>
            );
          } else {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
              </li>
            );
          }
        }
      });
      listItems = [
        ...listItems,
        props.openWeatherData.f.slice(7).map((temp, key) => {
          keyVal += 1;
          if (temp[1] !== null) {
            if (keyVal % 2 === 0) {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
                </li>
              );
            } else {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
                </li>
              );
            }
          }
        }),
      ];
    } else if (props.modelName.name === "Long Short-Term Memory") {
      listItems = props.modelData.f.slice(0, 7).map((temp, key) => {
        keyVal += 1;
        if (temp[1] !== null) {
          if (keyVal % 2 === 0) {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
              </li>
            );
          } else {
            return (
              <li
                className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                key={keyVal}
              >
                <span className="text-black">
                  {new Date(temp[0]).toDateString().slice(4, 10)}
                </span>
                <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
              </li>
            );
          }
        }
      });
      listItems = [
        ...listItems,
        props.modelData.f.slice(7).map((temp, key) => {
          keyVal += 1;
          if (temp[1] !== null) {
            if (keyVal % 2 === 0) {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
                </li>
              );
            } else {
              return (
                <li
                  className="flex justify-between w-full py-3 px-4 odd:bg-white even:bg-slate-50"
                  key={keyVal}
                >
                  <div className="flex w-fit gap-x-3">
                    <span className="text-black">
                      {new Date(temp[0]).toDateString().slice(4, 10)}
                    </span>
                  </div>
                  <span className="text-black">{temp[1].toFixed(1)}&deg;F</span>
                </li>
              );
            }
          }
        }),
      ];
    }
  }
  return <ol className="flex flex-col w-full divide-y">{listItems}</ol>;
};
export default TempRow;
