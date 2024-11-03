"use client";
import React, {  useState } from 'react';

import '../../App.css';
import '../Forecast/Forecast.css';
import questionMark from "../../assets/question-mark.svg"

import Header from '../../components/Header/Header';
import ForecastForm from '../../components/ForecastForm/ForecastForm';
import Map from '../../components/Map/Map';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

function Forecast() {
  // Used to annotate charts and forecast sections
  const [modelInfo, setModelInfo] = useState({
    region: "",
    model: "",
    predictions: {}
  });

  const [helpBoxToggle, setHelpBoxToggle] = useState(false);

  // Temporary static temperature data
  const openWeatherData = {
		c: [[new Date('2023/12/24').getTime(), -17.3], [new Date('2023/12/25').getTime(), -17.8], [new Date('2023/12/26').getTime(), -19.7], [new Date('2023/12/27').getTime(), -15.4], [new Date('2023/12/28').getTime(), -13.8], [new Date('2023/12/29').getTime(), -11.7], [new Date('2023/12/30').getTime(), -15.2],  [new Date('2023/12/31').getTime(), -14.3],  [new Date('2024/01/01').getTime(), -15.5], [new Date('2024/01/02').getTime(), -13.7], [new Date('2024/01/03').getTime(), -14.8], [new Date('2024/01/04').getTime(), -15.5]],
		f: [[new Date('2023/12/24').getTime(), 0.9], [new Date('2023/12/25').getTime(), -0.1], [new Date('2023/12/26').getTime(), -3.5], [new Date('2023/12/27').getTime(), 4.3], [new Date('2023/12/28').getTime(), 7.2], [new Date('2023/12/29').getTime(), 10.9], [new Date('2023/12/30').getTime(), 4.7],  [new Date('2023/12/31').getTime(), 6.2],  [new Date('2024/01/01').getTime(), 4.1], [new Date('2024/01/02').getTime(), 7.4], [new Date('2024/01/03').getTime(), 5.4], [new Date('2024/01/04').getTime(), 4.1]]
	}
	const modelData = {
		c: [[new Date('2023/12/24').getTime(), null], [new Date('2023/12/25').getTime(), null], [new Date('2023/12/26').getTime(), null], [new Date('2023/12/27').getTime(), null], [new Date('2023/12/28').getTime(), null], [new Date('2023/12/29').getTime(), null], [new Date('2023/12/30').getTime(), -15.2], [new Date('2023/12/31').getTime(), -15.6], [new Date('2024/01/01').getTime(), -16.3], [new Date('2024/01/02').getTime(), -14.9], [new Date('2024/01/03').getTime(), -12.6], [new Date('2024/01/04').getTime(), -12.0]],
		f: [[new Date('2023/12/24').getTime(), null], [new Date('2023/12/25').getTime(), null], [new Date('2023/12/26').getTime(), null], [new Date('2023/12/27').getTime(), null], [new Date('2023/12/28').getTime(), null], [new Date('2023/12/29').getTime(), null], [new Date('2023/12/30').getTime(), 4.7], [new Date('2023/12/31').getTime(), 3.9], [new Date('2024/01/01').getTime(), 2.7], [new Date('2024/01/02').getTime(), 5.2], [new Date('2024/01/03').getTime(), 9.4], [new Date('2024/01/04').getTime(), 10.4]]
	}

  return (
    <div className='flex flex-col relative bg-white min-h-[100vh]'> 
        <Header></Header>
        <div className="flex flex-col w-full bg-white mt-6 mb-6 px-4 md:px-6 main-content-top-padding">
          <div className='flex relative w-full justify-between items-end pb-1 border-2 md:border-b-2 rounded-t-lg'>
            <span className='text-slate-600 font-bold text-lg md:text-2xl pt-6 pl-4'>Model Selection</span>
            <img src={questionMark} onClick={() => {setHelpBoxToggle((bool) => !bool)}} className='w-fill w-[24px] h-[24px] mr-2 mb-0.5 hover:cursor-pointer'></img>
            { 
              helpBoxToggle === true ? 
                                      (<div className='flex absolute right-0 -bottom-[80px] md:-bottom-[60px] border-2 shadow-lg bg-white rounded-md' style={{zIndex: '100'}}>
                                        <p className='text-black text-left text-sm md:text-md w-[280px] md:w-[500px] px-3 py-2'>Select a location and model to make a forecast. The map will show which countries have models.</p>
                                       </div>)
                                     :
                                      (null)
            }
          </div>
          <div className="grid grid-rows-2 md:grid-rows-none grid-cols-none md:grid-cols-3 bg-slate-50 relative md:border-l-2 md:border-r-2 md:rounded-bl-lg md:border-b-2 md:rounded-br-lg">
            <div className="w-full lg:w-4/5 border-r-2 border-l-2 md:border-0 md:mx-auto row-span-2 col-span-0 md:row-span-1 md:col-span-2 overflow-clip relative">
              <Map></Map>
            </div>
            <ForecastForm modelInfo={modelInfo} setModelInfo={setModelInfo}></ForecastForm>   
          </div>
        </div>
        {
          modelInfo.region !== '' && modelInfo.model !== '' ? 
                                                            (<SectionContainer openWeatherData={openWeatherData} modelData={modelData} modelInfo={modelInfo} setModelInfo={setModelInfo}></SectionContainer>)
                                                            :
                                                            (null)
        }
    </div>
  );
}

export default Forecast