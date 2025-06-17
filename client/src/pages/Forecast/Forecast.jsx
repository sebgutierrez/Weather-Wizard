import React, { useState, useRef } from 'react';

import '../../App.css';
import '../Forecast/Forecast.css';

import Header from '../../components/Header/Header';
import ForecastForm from '../../components/ForecastForm/ForecastForm';
import LibreMap from '../../components/LibreMap/LibreMap';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

import cogSVG from '../../assets/cog.svg';

function flipForecastTemperatureScale(modelData, regionName, isCelsius){

  let updatedModelData = { 
    ...modelData,
  }

  for (const [model, forecast] of Object.entries(modelData[regionName])){
    let flippedForecast = forecast.map((point) => {
      if(isCelsius){
        return {
          ...point,
          temperature: Math.round((point.temperature - 32) * (5/9))
        }
      } else {
        return {
          ...point,
          temperature: Math.round((point.temperature * (9/5)) + 32)
        }
      }
    })
    updatedModelData = {
      ...updatedModelData,
      [regionName]: {
        ...updatedModelData[regionName],
        [model]: flippedForecast
      }
    }
  }
  return updatedModelData
}

function Forecast() {
  const [regionInfo, setRegionInfo] = useState({
    region: "",
    latitude: 40,
    longitude: -80,
    predictions: {} 
  });
  const [isCelsius, setIsCelsius] = useState(false);
  const [modelData, setModelData] = useState({
    metadata: {
      timestamps: [
        "2025-06-16T00:00:00",
        "2025-06-16T03:00:00",
        "2025-06-16T06:00:00"
      ]
    },
    "Houston, TX, USA": {
      "LSTM": [
        {
          timestamp: "2025-06-16T00:00:00",
          temperature: 73
        },
        {
          timestamp: "2025-06-16T03:00:00",
          temperature: 80
        },
        {
          timestamp: "2025-06-16T06:00:00",
          temperature: 82
        }
      ],
      "1D CNN": [
        {
          timestamp: "2025-06-16T00:00:00",
          temperature: 73
        },
        {
          timestamp: "2025-06-16T03:00:00",
          temperature: 76
        },
        {
          timestamp: "2025-06-16T06:00:00",
          temperature: 85
        }
      ]
    }
  })
  const [apiData, setApiData] = useState({
    metadata: {
      timestamps: [
        "2025-06-16T00:00:00",
        "2025-06-16T06:00:00",
        "2025-06-16T09:00:00"
      ]
    },
    "Houston, TX, USA": {
      "National Weather Service": [
        {
          timestamp: "2025-06-16T00:00:00",
          temperature: 73
        },
        {
          timestamp: "2025-06-16T03:00:00",
          temperature: 78
        },
        {
          timestamp: "2025-06-16T06:00:00",
          temperature: 83
        }
      ],
    }
  })
  const [section, setSection] = useState("forecast");
  const [settingsToggle, setSettingsToggle] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  function flipSection() {
    setSection((section) => (section === "forecast" ? "models" : "forecast"));
  }

  function flipIsCelsius() {
    let flippedModelData = flipForecastTemperatureScale(modelData, regionInfo.region, !isCelsius)
    let flippedApiData = flipForecastTemperatureScale(apiData, regionInfo.region, !isCelsius)
    setModelData(flippedModelData)
    setApiData(flippedApiData)
    setIsCelsius((isCelsius) => !isCelsius)
  }

  function flipSettingsToggle(){
    setSettingsToggle((settingsToggle) => !settingsToggle)
  }

  return (
    <div className='relative min-h-[100vh] overflow-x-hidden flex flex-col'> 
        <Header></Header>
        <div className="relative bg-white flex flex-col items-center min-h-[calc(100vh-80px+2px)] pb-6 pt-3 px-4">
          {/* <div className= "w-full flex justify-center py-4">
            { 
              section === "forecast" ? (
                <div>
                  <button onClick={() => flipSection()} className="text-lg font-bold px-6 py-2 rounded-full bg-[#083999] text-white hover:bg-[#083999] mr-2">Forecasts</button>
                  <button onClick={() => flipSection()} className="text-lg px-6 py-2 rounded-full text-black hover:bg-[#083999] hover:text-white hover:font-bold">Models</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => flipSection()} className="text-lg px-6 py-2 rounded-full text-black hover:bg-[#083999] hover:text-white hover:font-bold mr-2">Forecasts</button>
                  <button onClick={() => flipSection()} className="text-lg font-bold px-6 py-2 rounded-full bg-[#083999] text-white hover:bg-[#083999]">Models</button>
                </div>
              ) 
            }
          </div> */}
          {/* <div>
            {
              section === "forecast" ? (
                <div>
                  <div className="rounded-md bg-[#2C74FF] forecast-form-gradient h-fit mt-6 mb-12 flex flex-col gap-y-8 md:gap-y-0 md:flex-row py-6 md:py-8 px-3 sm:px-6 md:px-8 mx-0 md:mx-12 lg:mx-24">
                    <div className="flex flex-col mx-4">
                      <h2 className="text-lg md:text-xl lg:text-2xl text-white font-bold pb-4 md:pb-6">Create a Temperature Forecast</h2>
                      <p className="text-md text-white text-left lg:px-8">Choose from select regions and models to forecast tomorrow's temperatures. Models will take the weather conditions of the past three days to make up-to-date forecasts.</p>
                    </div>
                    <ForecastForm modelInfo={modelInfo} setModelInfo={setModelInfo}></ForecastForm>
                  </div>
                  <div className="relative w-full flex flex-col px-0 md:px-20 mt-8">
                    { 
                      modelInfo.region !== '' && modelInfo.model !== '' &&
                      (
                        <div>
                          <div className="w-full flex flex-col items-start py-3">
                            <h2 className="text-slate-700 text-xl">Settings</h2>
                            <div className="w-full my-2 px-0 h-px bg-slate-900/5"></div>
                            <label htmlFor="degree" className="text-slate-700 text-md py-1">Temperature Unit</label>
                            <select name="degree" id="degree" className="bg-white w-[142px] py-1 text-slate-500 hover:bg-gray-50 border-2 border-slate-200" onChange={flipIsCelsius}>
                              <option value="°F">Fahrenheit °F</option>
                              <option value="°C">Celsius °C</option>
                            </select>
                          </div>
                          <h2 className="text-slate-700 mt-4 text-xl text-left">Forecast</h2>
                          <div className="w-full mt-2 mb-6 px-0 h-px bg-slate-900/5"></div>
                          <LibreMap modelInfo={modelInfo} apiData={apiData} isCelsius={isCelsius}></LibreMap>
                          <SectionContainer apiData={apiData} modelData={modelData} modelInfo={modelInfo} setModelInfo={setModelInfo} isCelsius={isCelsius}></SectionContainer>
                        </div>
                      )
                    }
                  </div>  
              </div>
            ) : (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-slate-700">Models</h1>
            )
            }
          </div> */}
          <div>
            <div className="rounded-md bg-[#2C74FF] forecast-form-gradient h-fit mt-12 mb-12 flex flex-col gap-y-8 md:gap-y-0 md:flex-row py-6 md:py-8 px-3 sm:px-6 md:px-8 mx-0 md:mx-12">
              <div className="flex flex-col mx-4">
                <h2 className="text-lg md:text-xl lg:text-2xl text-white font-bold pb-4 md:pb-6">Temperature Forecast</h2>
                <p className="text-md text-white text-left lg:px-8">Confirm a region to view its forecasts. Models will take the weather conditions of the past week to make up-to-date forecasts.</p>
              </div>
              <ForecastForm regionInfo={regionInfo} setRegionInfo={setRegionInfo}></ForecastForm>
            </div>
            <div className="relative w-full flex flex-col px-0 md:px-12 mt-8">
              { 
                regionInfo.region !== '' &&
                (
                  <div>
                    <div className="relative w-full flex flex-row justify-between items-end gap-x-2 py-3">
                      <h2 className="text-white w-fit font-bold rounded-full px-6 py-2 bg-[#2C74FF]">{regionInfo.region}</h2>
                      <img
                        src={cogSVG}
                        className="object-cover w-[40px] h-[40px] px-[4px] py-[4px] border-2 rounded-lg border-slate-200 hover:bg-slate-200/20 hover:cursor-pointer"
                        onClick={() => flipSettingsToggle()}
                      />
                      {
                        settingsToggle && (
                          <div className="absolute top-[calc(76px-16px)] right-0 py-4 px-4 bg-white border-2 border-slate-200 shadow-lg rounded-md" style={{zIndex: 999}}>
                            <div className="flex flex-col items-start gap-y-1">
                              <label htmlFor="degree" className="text-slate-700 text-md pr-2">Temperature</label>
                              <select name="degree" id="degree" className="bg-white w-[142px] text-slate-500 hover:bg-gray-50 border-2 border-slate-200" onChange={flipIsCelsius}>
                                <option value="°F">Fahrenheit °F</option>
                                <option value="°C">Celsius °C</option>
                              </select>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    {
                      isLoadingData ? (
                        <div style={{display: 'relative', borderWidth: '2px', borderColor: 'rgba(203, 213, 225, 1.0)', borderRadius: '0.375rem', margin: '0.75rem 0 1rem 0', overflowY: 'hidden', height: '60vh'}}>
                          <div className="absolute top-[calc(36%)] md:top-[calc(34%)] left-[calc(50%-58px)] text-black bg-white">
                            Loading data...
                          </div>
                        </div>
                      ) : (
                        <LibreMap regionInfo={regionInfo} modelData={modelData} apiData={apiData} isCelsius={isCelsius}></LibreMap>
                      )
                    }
                    <SectionContainer isLoadingData={isLoadingData} regionInfo={regionInfo} setRegionInfo={setRegionInfo} modelData={modelData} apiData={apiData} isCelsius={isCelsius}></SectionContainer>
                  </div>
                )
              }
            </div>  
          </div>
        </div>
    </div>
  );
}

export default Forecast