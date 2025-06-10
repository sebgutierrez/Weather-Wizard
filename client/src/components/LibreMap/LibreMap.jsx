import React, { useState } from "react";
import { Map, Marker, AttributionControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './LibreMap.css';

import pinSVG from "../../assets/pin.svg";

function militaryTimeStamp(hour){
  if(hour < 10){
    return "0" + hour + ":00:00"
  } else if (hour === 24) {
    return "00:00:00"
  } else {
    return hour + ":00:00"
  }
}

function meridianTimeStamp(hour){
  if(hour === 0 || hour === 24){
    return "12AM"
  } else if(hour === 12){
    return "12PM"
  } else if(hour < 12){
    return hour + "PM"
  } else {
    let cast = hour % 12
    return cast + "PM"
  }
}

function roundUp(hour){
  // round up to next hour that is a multiple of 3
  while(hour % 3 !== 0){
    hour = hour + 1
    if(hour === 24){
      hour = 0
      return hour
    }
  }
  return hour
}

function makeTimeline(){
  let baseHour = new Date().getHours()

  baseHour = roundUp(baseHour)

  let points = []
  points[0] = baseHour

  // Full 24-hr cycle
  for(let i = 1; i < 8; i ++){
    points[i] = (baseHour + 3 * i) % 24
  }

  return points;
}

const TemperatureMarker = (props) => {
  return (
    props.isCelsius ? (
      <div className="bg-white absolute top-[calc(50%-40px-24px)] left-[calc(50%+24px)] px-2 py-2 rounded-md shadow-md">
        <div className="inline-flex">
          <span className="text-[#4D4D4D] font-semibold text-xl md:text-[20px]">
            {props.temperature}
          </span>
          <span className="top-[8px] text-[#4D4D4D]">
            &deg;
          </span>
        </div>
      </div>
    )
    :
    (
      <div className="bg-white absolute top-[calc(50%-40px-24px)] left-[calc(50%+24px)] px-2 py-2 rounded-md shadow-md">
        <div className="inline-flex">
          <span className="text-[#4D4D4D] font-semibold text-xl md:text-[20px]">
            {props.temperature}
          </span>
          <span className="top-[8px] text-[#4D4D4D]">
            &deg;
          </span>
        </div>
      </div>
    )
  )
}

const TimeLine = (props) => {
  const timelinePoints = makeTimeline();

  let militaryTimeStamps = timelinePoints.map((hour) => militaryTimeStamp(hour))
  let meridianTimeStamps = timelinePoints.map((hour) => meridianTimeStamp(hour))

  return (
    <div className="time-slots-container">
      <div className="time-slots shadow-md">
        <input type="radio" name="timeline" id="first" defaultChecked/>
        <label className="rounded-l-md" htmlFor="first" onClick={() => props.setTimeStamp(militaryTimeStamps[0])}>{meridianTimeStamps[0]}</label>
        <input type="radio" name="timeline" id="second"/>
        <label className="border-l-[2px]" htmlFor="second" onClick={() => props.setTimeStamp(militaryTimeStamps[1])}>{meridianTimeStamps[1]}</label>
        <input type="radio" name="timeline" id="third"/>
        <label className="border-l-[2px]" htmlFor="third" onClick={() => props.setTimeStamp(militaryTimeStamps[2])}>{meridianTimeStamps[2]}</label>
        <input type="radio" name="timeline" id="fourth"/>
        <label className="border-l-[2px]" htmlFor="fourth" onClick={() => props.setTimeStamp(militaryTimeStamps[3])}>{meridianTimeStamps[3]}</label>
        <input type="radio" name="timeline" id="fifth"/>
        <label className="border-l-[2px]" htmlFor="fifth" onClick={() => props.setTimeStamp(militaryTimeStamps[4])}>{meridianTimeStamps[4]}</label>
        <input type="radio" name="timeline" id="sixth"/>
        <label className="border-l-[2px]" htmlFor="sixth" onClick={() => props.setTimeStamp(militaryTimeStamps[5])}>{meridianTimeStamps[5]}</label>
        <input type="radio" name="timeline" id="seventh"/>
        <label className="border-l-[2px]" htmlFor="seventh" onClick={() => props.setTimeStamp(militaryTimeStamps[6])}>{meridianTimeStamps[6]}</label>
        <input type="radio" name="timeline" id="eight"/>
        <label className="rounded-r-md border-l-[2px]" htmlFor="eight" onClick={() => props.setTimeStamp(militaryTimeStamps[7])}>{meridianTimeStamps[7]}</label>
      </div>
    </div>
  );
}

const LibreMarker = (props) => {
  return (
    <div>
      {
        props.regionName === "Houston, TX, USA" && 
        (
          <div>
            <TemperatureMarker isCelsius={props.isCelsius} temperature={props.temperature}/>
            <Marker longitude={-95.4} latitude={29.7} anchor="bottom">
              <img className="object-contain w-[40px] h-[40px]" src={pinSVG} />
            </Marker>
          </div>
        )
      }
    </div>
  )
}

function findTemperature(isCelsius, apiData, regionName, selectedTimeStamp){
  if(isCelsius){
    for(const entry of apiData[regionName].c.entries()){
      const timeStamp = new Date(entry[0]).toString().slice(16, 24)
      if(timeStamp === selectedTimeStamp){
        return apiData[regionName].c.get(entry[0])
      }
    }
  } else {
    for(const entry of apiData[regionName].f.entries()){
      const timeStamp = new Date(entry[0]).toString().slice(16, 24)
      if(timeStamp === selectedTimeStamp){
        return apiData[regionName].f.get(entry[0])
      }
    }
  }
}

const LibreMap = (props) => {
  const [timeStamp, setTimeStamp] = useState(militaryTimeStamp(roundUp(new Date().getHours())));

  let temperature = findTemperature(props.isCelsius, props.apiData, props.modelInfo.region, timeStamp)

  return (
    <div>
      <h2 className="text-slate-700 text-xl text-left mt-4">Temperature Map</h2>
      <div className="w-full mt-3 mb-6 px-0 h-px bg-slate-900/5"></div>
      <Map
        longitude={props.modelInfo.geo.long}
        latitude={props.modelInfo.geo.lat}
        zoom="4"
        style={{display: 'relative', borderWidth: '2px', borderColor: 'rgba(203, 213, 225, 1.0)', borderRadius: '0.375rem', margin: '0.75rem 0 1rem 0', overflowY: 'auto', minHeight: '50vh', maxHeight: '50vh'}}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        attributionControl={false}
        
      >
        <AttributionControl compact={true} position="top-right"></AttributionControl>
        <div className="model-name bg-white text-[#4d4d4d] shadow-md rounded-lg absolute text-[16px] px-6 py-1">{props.modelInfo.region}</div>
        <TimeLine setTimeStamp={setTimeStamp} />
        <LibreMarker regionName={props.modelInfo.region} isCelsius={props.isCelsius} temperature={temperature}/>
      </Map>
    </div>
  );
};

export default LibreMap;
