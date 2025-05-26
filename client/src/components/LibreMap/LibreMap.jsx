import React, { useRef, useEffect } from "react";
import {Map, Marker, useMap} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import Pin from "../../assets/Pin.svg";

const LibreMap = (props) => {
  const {current: map} = useMap();

  const onClick = () => {
    map.flyTo({center: [props.modelInfo.geo.lat, props.modelInfo.geo.long]});
  };

  return (
    <Map
      longitude={props.modelInfo.geo.long}
      latitude={props.modelInfo.geo.lat}
      minZoom="2"
      maxZoom="4"
      style={{borderWidth: '2px', borderColor: 'rgba(203, 213, 225, 1.0)', borderRadius: '0.375rem', margin: '0.75rem 0 0 0', overflowY: 'auto', minHeight: '50vh', maxHeight: '50vh'}}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    >
      {
        props.modelInfo.region === "Houston, TX, USA" ? 
        (
          <Marker longitude={-95.4} latitude={29.7} anchor="bottom" onClick={onClick}>
            <img className="object-contain w-[40px] h-[40px]" src={Pin} />
          </Marker>
        )
        :
        (
          null
        )
      }
    </Map>
  );
};

export default LibreMap;
