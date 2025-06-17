import React, { useState } from "react";
import { Map, Marker, AttributionControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './LibreMap.css';

import pinSVG from "../../assets/pin.svg";

function meridianTimeStamp(timestamp){
  let hour = Number(timestamp.slice(11, 13))
  if(hour === 0 || hour === 24){
    return "12AM"
  } else if(hour === 12){
    return "12PM"
  } else if(hour < 12){
    return hour + "AM"
  } else {
    let cast = hour % 12
    return cast + "PM"
  }
}

const TemperatureMarkers = (props) => {
  let modelAndTemperaturesArray = Object.entries(props.modelTemperatures)

  const temperatureCards = modelAndTemperaturesArray.map((modelAndTemperature) => {
    return (      
      <div key={modelAndTemperature[0]} className="bg-[#2c74ff] shadow-md rounded-lg px-3 py-1.5">
        <div className="flex flex-row">
          <span className="text-white text-[14px] md:text-[16px] pr-[3px]">
            {modelAndTemperature[0]}:
          </span>
          <span className="text-white text-[14px] md:text-[16px]">
            {modelAndTemperature[1]}
          </span>
          <span className="text-[14px] md:text-[16px] text-white">
            &deg;
          </span>
        </div>
      </div>
    )
  })

  return (
    <div className="absolute top-[calc(0%+4px)] left-[calc(0%+4px)] md:top-[calc(50%-84px)] md:left-[calc(50%+32px)] flex flex-col gap-y-1">
      {temperatureCards}
    </div>
  )
}

function getTemperatures(dlModels, apiModels, selectedTimeStamp){
  let modelTemperatures = {}
  for(const [model, forecast] of Object.entries(dlModels)){
    let temperature = 0
    forecast.forEach((point) => {
      if(point.timestamp === selectedTimeStamp){
        temperature = point.temperature
      }
    })
    modelTemperatures[model] = temperature
  }
  for(const [model, forecast] of Object.entries(apiModels)){
    let temperature = 0
    forecast.forEach((point) => {
      if(point.timestamp === selectedTimeStamp){
        temperature = point.temperature
      }
    })
    modelTemperatures[model] = temperature
  }
  return modelTemperatures
}

const LibreMap = (props) => {
  const [timeStamp, setTimeStamp] = useState(props.modelData.metadata.timestamps[0]);
  
  let modelTemperatures = getTemperatures(props.modelData[props.regionInfo.region], props.apiData[props.regionInfo.region], timeStamp)
  let meridianTimeStamps = props.modelData.metadata.timestamps.map((timestamp) => meridianTimeStamp(timestamp))

  return (
    <Map
      longitude={props.regionInfo.longitude}
      latitude={props.regionInfo.latitude}
      zoom="4"
      style={{display: 'relative', borderWidth: '2px', borderColor: 'rgba(203, 213, 225, 1.0)', borderRadius: '0.375rem', margin: '0.75rem 0 1rem 0', overflowY: 'hidden', height: '60vh'}}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      attributionControl={false}
    >
      <AttributionControl compact={true} position="top-right"></AttributionControl>
      <div className="time-slots-container">
        <div className="time-slots shadow-md">
          <input type="radio" name="timeline" id="first" defaultChecked/>
          <label className="rounded-l-md" htmlFor="first" onClick={() => setTimeStamp(props.modelData.metadata.timestamps[0])}>{meridianTimeStamps[0]}</label>
          <input type="radio" name="timeline" id="second"/>
          <label className="border-l-[2px]" htmlFor="second" onClick={() => setTimeStamp(props.modelData.metadata.timestamps[1])}>{meridianTimeStamps[1]}</label>
          <input type="radio" name="timeline" id="third"/>
          <label className="border-l-[2px] rounded-r-md" htmlFor="third" onClick={() => setTimeStamp(props.modelData.metadata.timestamps[2])}>{meridianTimeStamps[2]}</label>
        </div>
      </div>
      <TemperatureMarkers isCelsius={props.isCelsius} modelTemperatures={modelTemperatures}/>
      <Marker longitude={props.regionInfo.longitude} latitude={props.regionInfo.latitude} anchor="bottom">
        <img className="object-contain w-[40px] h-[40px]" src={pinSVG} />
      </Marker>
    </Map>
  );
};

export default LibreMap;
