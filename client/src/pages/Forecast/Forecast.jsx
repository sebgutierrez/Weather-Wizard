"use client";
import React, {  useState } from 'react';

import '../../App.css';
import '../Forecast/Forecast.css';
import questionMark from "../../assets/question-mark.svg"

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
      long: -60
    },
    predictions: {} 
  });

  const [isCelsius, setIsCelsius] = useState(false);

  function flipIsCelsius() {
    setIsCelsius((isCelsius) => !isCelsius);
  }
  
  // Temporary static temperature data

  const openWeatherData = {
		c: [[new Date('2025-05-24T00:00:00').getTime(), -17.3], [new Date('2025-05-24T03:00:00').getTime(), -17.8], [new Date('2025-05-24T06:00:00').getTime(), -19.7], [new Date('2025-05-24T09:00:00').getTime(), -15.4], [new Date('2025-05-24T12:00:00').getTime(), -13.8], [new Date('2025-05-24T15:00:00').getTime(), -11.7], [new Date('2025-05-24T18:00:00').getTime(), -15.2],  [new Date('2025-05-24T21:00:00').getTime(), -14.3], [new Date('2025-05-25T00:00:00').getTime(), -11.0]],
		f: [[new Date('2025-05-24T00:00:00').getTime(), 0.9], [new Date('2025-05-24T03:00:00').getTime(), -0.1], [new Date('2025-05-24T06:00:00').getTime(), -3.5], [new Date('2025-05-24T09:00:00').getTime(), 4.3], [new Date('2025-05-24T12:00:00').getTime(), 7.2], [new Date('2025-05-24T15:00:00').getTime(), 10.9], [new Date('2025-05-24T18:00:00').getTime(), 4.7],  [new Date('2025-05-24T21:00:00').getTime(), 6.2], [new Date('2025-05-25T00:00:00').getTime(), 12.2]]
	}
	const modelData = {
		c: [[new Date('2025-05-24T00:00:00').getTime(), null], [new Date('2025-05-24T03:00:00').getTime(), null], [new Date('2025-05-24T06:00:00').getTime(), null], [new Date('2025-05-24T09:00:00').getTime(), null], [new Date('2025-05-24T12:00:00').getTime(), null], [new Date('2025-05-24T15:00:00').getTime(), null], [new Date('2025-05-24T18:00:00').getTime(), -15.2], [new Date('2025-05-24T21:00:00').getTime(), -15.6], [new Date('2025-05-25T00:00:00').getTime(), -16.3]],
		f: [[new Date('2025-05-24T00:00:00').getTime(), null], [new Date('2025-05-24T03:00:00').getTime(), null], [new Date('2025-05-24T06:00:00').getTime(), null], [new Date('2025-05-24T09:00:00').getTime(), null], [new Date('2025-05-24T12:00:00').getTime(), null], [new Date('2025-05-24T15:00:00').getTime(), null], [new Date('2025-05-24T18:00:00').getTime(), 4.7], [new Date('2025-05-24T21:00:00').getTime(), 3.9], [new Date('2025-05-25T00:00:00').getTime(), 2.6]]
	}

  return (
    <div className='flex flex-col relative bg-white'> 
        <Header></Header>
        <div className="flex flex-col md:flex-row items-center md:items-start pb-2 md:pb-0 pt-2 md:pt-0 relative px-4 md:my-4">
          <ForecastForm modelInfo={modelInfo} setModelInfo={setModelInfo}></ForecastForm>
          <div className="relative w-full flex flex-col max-h-[calc(100vh-72px)] px-0 md:px-2 overflow-y-auto">
            <LibreMap modelInfo={modelInfo}></LibreMap>
            <div className="flex flex-col items-start py-3">
              <h2 className="text-slate-700 text-xl">Settings</h2>
              <label htmlFor="degree" className="text-slate-700 text-md py-1">Temperature Unit</label>
              <select name="degree" id="degree" className="bg-white w-[142px] py-1 text-slate-500 hover:bg-gray-50 border-2 border-slate-200" onChange={flipIsCelsius}>
                <option value="°F">Fahrenheit °F</option>
                <option value="°C">Celsius °C</option>
              </select>
            </div>
            {
              modelInfo.region !== '' && modelInfo.model !== '' ? 
                                                                (<SectionContainer openWeatherData={openWeatherData} modelData={modelData} modelInfo={modelInfo} setModelInfo={setModelInfo} isCelsius={isCelsius}></SectionContainer>)
                                                                :
                                                                (null)
            }
          </div>  
        </div>
    </div>
  );
}

export default Forecast