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
        [new Date('2025-05-24T00:00:00').getTime(), -17.3], 
        [new Date('2025-05-24T03:00:00').getTime(), -17.8], 
        [new Date('2025-05-24T06:00:00').getTime(), -19.7], 
        [new Date('2025-05-24T09:00:00').getTime(), -15.4], 
        [new Date('2025-05-24T12:00:00').getTime(), -13.8], 
        [new Date('2025-05-24T15:00:00').getTime(), -11.7], 
        [new Date('2025-05-24T18:00:00').getTime(), -15.2], 
        [new Date('2025-05-24T21:00:00').getTime(), -14.3]
      ]),
      f: new Map([
        [new Date('2025-05-24T00:00:00').getTime(), 0.9], 
        [new Date('2025-05-24T03:00:00').getTime(), -0.1], 
        [new Date('2025-05-24T06:00:00').getTime(), -3.5], 
        [new Date('2025-05-24T09:00:00').getTime(), 4.3], 
        [new Date('2025-05-24T12:00:00').getTime(), 7.2], 
        [new Date('2025-05-24T15:00:00').getTime(), 10.9], 
        [new Date('2025-05-24T18:00:00').getTime(), 4.7],  
        [new Date('2025-05-24T21:00:00').getTime(), 6.2]
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
    <div className='relative min-h-[100vh] flex flex-col bg-white'> 
        <Header></Header>
        <div className="absolute bg-[#2c74ff] w-full h-[50vh]"></div>
        <div className="relative flex flex-col items-center min-h-[calc(100vh-80px)] pt-[calc(50vh-200px)] px-4">
          <ForecastForm modelInfo={modelInfo} setModelInfo={setModelInfo}></ForecastForm>
          <div className="relative w-full flex flex-col px-0 md:px-20 pb-6">
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