import React, { useState } from "react";

const ForecastForm = (props) => {
  const [formRegion, setRegionData] = useState({
    name: ""
  });

  const [regionGeo, setRegionGeo] = useState({
    latitude: "",
    longitude: ""
  })

  const handleInputChange = (e) => {
    // Don't change state if the blank option is selected
    if (e.target.selectedIndex !== 0) {
      let optionRegionName = e.target.options[e.target.selectedIndex].getAttribute(
        "data-region-name",
      );
      let optionLat = 
        e.target.options[e.target.selectedIndex].getAttribute(
          "data-lat",
        );
      let optionLong = 
        e.target.options[e.target.selectedIndex].getAttribute(
          "data-long",
        );
      setRegionData({
        name: optionRegionName
      });
      setRegionGeo({
        latitude: optionLat,
        longitude: optionLong,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch("http://localhost:5000/predict", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     region: formRegion.name
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   mode: "cors",
    // })
    //   .then((data) => data.json())
    //   .then((predictions) => {
    //     // setPredictedData(data.get('predicted'));
    //     // setExpectedData(data.get('expected'));
    //     console.log(predictions);
    //     props.setModelInfo({
    //       region: formRegion.name,
    //       geo: {
    //         lat: regionGeo.latitude,
    //         long: regionGeo.longitude
    //       },
    //       predictions: predictions,
    //     });
    //   });
    props.setRegionInfo({
      region: formRegion.name,
      latitude: regionGeo.latitude,
      longitude: regionGeo.longitude,
      predictions: {},
    });
  };
  return (
    <div className="relative w-full md:w-fit h-full bg-white border-2 md:ml-4 border-slate-300 rounded-md">
      <form
        className="flex flex-col w-full h-full gap-y-6 justify-between px-4 py-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <h2 className="text-slate-600 font-bold text-left text-md md:text-lg lg:text-xl">
            Region Selection
          </h2>
          <div className="my-2 px-0 h-px bg-slate-900/10"></div>
          <label htmlFor="region">
            <p className="text-black text-left">Region</p>
          </label>
          <select
            type="text"
            className="bg-white px-1 py-1 mb-4 w-full md:w-[300px] text-slate-500 hover:bg-gray-50 border-2 border-slate-200"
            id="region"
            name="region"
            onChange={handleInputChange}
          >
            <option value="" data-short-name=""></option>
            <option value="Houston, TX, USA" data-region-name="Houston, TX, USA" data-lat="29.7" data-long="-95.4">
              Houston, TX, USA
            </option>
          </select>
        </div>
        {
          formRegion.name === "" ? 
          (
            <button
              type="submit"
              className="bg-slate-100 border-slate-200 border-2 mb-0 rounded-md py-2 font-bold text-lg text-slate-400 cursor-not-allowed"
            >
              Forecast
            </button>
          ) 
          : 
          (
            <button
              type="submit"
              className="bg-[#2c74ff] text-white rounded-md text-lg mb-0 py-2 font-bold cursor-pointer"
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
