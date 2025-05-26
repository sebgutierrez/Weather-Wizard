import React, { useState, useRef, useEffect } from "react";

const ForecastForm = (props) => {
  const [formRegion, setRegionData] = useState({
    longRegionName: "",
    shortRegionName: "",
  });

  const [formModel, setModelData] = useState({
    longModelName: "",
    shortModelName: "",
  });

  const [regionGeo, setRegionGeo] = useState({
    latitude: "",
    longitude: ""
  })

  const handleInputChange = (e) => {
    // Don't change state if the blank option is selected
    if (e.target.selectedIndex !== 0) {
      let optionLongName = e.target.options[e.target.selectedIndex].value;
      let optionShortName =
        e.target.options[e.target.selectedIndex].getAttribute(
          "data-short-name",
        );
      let optionLat = 
        e.target.options[e.target.selectedIndex].getAttribute(
          "data-lat",
        );
      let optionLong = 
        e.target.options[e.target.selectedIndex].getAttribute(
          "data-long",
        );
      if (e.target.name == "region") {
        setRegionData({
          longRegionName: optionLongName,
          shortRegionName: optionShortName,
        });
        setRegionGeo({
          latitude: optionLat,
          longitude: optionLong,
        });
      }
      if (e.target.name == "model") {
        setModelData({
          longModelName: optionLongName,
          shortModelName: optionShortName,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/predict", {
      method: "POST",
      body: JSON.stringify({
        region: formRegion.shortRegionName,
        model: formModel.shortModelName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((data) => data.json())
      .then((predictions) => {
        // setPredictedData(data.get('predicted'));
        // setExpectedData(data.get('expected'));
        console.log(predictions);
        props.setModelInfo({
          region: formRegion.longRegionName,
          model: formModel.longModelName,
          geo: {
            lat: regionGeo.latitude,
            long: regionGeo.longitude
          },
          predictions: predictions,
        });
      });
    props.setModelInfo({
      region: formRegion.longRegionName,
      model: formModel.longModelName,
      geo: {
        lat: regionGeo.latitude,
        long: regionGeo.longitude
      },
      predictions: {},
    });
  };

  return (
    <div className="relative md:h-[calc(100vh-72px-24px)] justify-center flex w-full md:min-w-[260px] md:max-w-[300px] bg-white md:mr-2 my-[12px] border-2 border-slate-300 rounded-md">
      <form
        className="w-full flex flex-col gap-y-6 justify-between px-4 py-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <p className="text-slate-700 text-lg text-left pb-2">Model Selection</p>
          <label htmlFor="region">
            <p className="text-black text-left">Region</p>
          </label>
          <select
            type="text"
            className="bg-white px-1 py-1 mb-4 w-full text-slate-500 hover:bg-gray-50 border-2 border-slate-200"
            id="region"
            name="region"
            onChange={handleInputChange}
          >
            <option value="" data-short-name=""></option>
            <option value="Houston, TX, USA" data-short-name="Houston" data-lat="29.7" data-long="-95.4">
              Houston, TX, USA
            </option>
          </select>
          <label htmlFor="model">
            <p className="text-black text-left">Model</p>
          </label>
          <select
            type="text"
            className="bg-white px-1 py-1 w-full text-slate-500 hover:bg-gray-50 border-2 border-slate-200"
            id="model"
            name="model"
            onChange={handleInputChange}
          >
            <option value="" data-short-name=""></option>
            <option value="Long Short-Term Memory" data-short-name="lstm">
              Long Short-Term Memory
            </option>
          </select>
        </div>
        {
          formRegion.longRegionName === "" ||
          formModel.longModelName === "" ? 
          (
            <button
              type="submit"
              className="bg-slate-100 border-slate-200 border-2 mb-0 rounded-md py-2 font-bold text-xl text-slate-400 cursor-not-allowed"
            >
              Forecast
            </button>
          ) 
          : 
          (
            <button
              type="submit"
              className="bg-[#2C74FF] border-[#2C74FF] hover:bg-[#083999] hover:border-[#083999] border-2 mb-0 rounded-md py-2 font-bold text-xl text-white cursor-pointer"
            >
              Forecast
            </button>
          )
        }
      </form>
    </div>
  );
};

export default ForecastForm;
