import React, { useState } from 'react';

import '../../App.css';
import '../Forecast/Forecast.css';

import Header from '../../components/Header/Header';
import ForecastForm from '../../components/ForecastForm/ForecastForm';
import LibreMap from '../../components/LibreMap/LibreMap';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

function Forecast() {
  // Used to annotate charts and forecast sections
  const [modelInfo, setModelInfo] = useState({
    region: "",
    model: "",
    geo: {
      lat: 40,
      long: -80
    },
    predictions: {} 
  });

  const [isCelsius, setIsCelsius] = useState(false);

  function flipIsCelsius() {
    setIsCelsius((isCelsius) => !isCelsius);
  }
  
  // Temporary static temperature data

  let apiData = {
    "Houston, TX, USA": {
      c: new Map([
        [new Date().getTime() + 0 * 60 * 60 * 1000, -17.3], 
        [new Date().getTime() + 3 * 60 * 60 * 1000, -17.8], 
        [new Date().getTime() + 6 * 60 * 60 * 1000, -19.7], 
        [new Date().getTime() + 9 * 60 * 60 * 1000, -15.4], 
        [new Date().getTime() + 12 * 60 * 60 * 1000, -13.8], 
        [new Date().getTime() + 15 * 60 * 60 * 1000, -11.7], 
        [new Date().getTime() + 18 * 60 * 60 * 1000, -15.2], 
        [new Date().getTime() + 21 * 60 * 60 * 1000, -14.3]
      ]),
      f: new Map([
        [new Date().getTime() + 0 * 60 * 60 * 1000, 0.9], 
        [new Date().getTime() + 3 * 60 * 60 * 1000, -0.1], 
        [new Date().getTime() + 6 * 60 * 60 * 1000, -3.5], 
        [new Date().getTime() + 9 * 60 * 60 * 1000, 4.3], 
        [new Date().getTime() + 12 * 60 * 60 * 1000, 7.2], 
        [new Date().getTime() + 15 * 60 * 60 * 1000, 10.9], 
        [new Date().getTime() + 18 * 60 * 60 * 1000, 4.7],  
        [new Date().getTime() + 21 * 60 * 60 * 1000, 6.2]
      ])
    }
	}

  let modelData = {
    Houston: {
      LSTM: {
        c: new Map(),
        f: new Map()
      }
    }
  }

  return (
    <div className='relative min-h-[100vh] overflow-x-hidden flex flex-col'> 
        <Header></Header>
        <div className="relative bg-white flex flex-col items-center min-h-[calc(100vh-80px+2px)] py-8 px-4">
          <div className="rounded-md bg-[#2C74FF] forecast-form-gradient h-fit my-12 flex flex-col gap-y-8 md:gap-y-0 md:flex-row py-6 md:py-8 px-3 sm:px-6 md:px-8 mx-0 md:mx-12 lg:mx-24">
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
    </div>
  );
}

export default Forecast