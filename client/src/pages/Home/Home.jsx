import React, { Fragment } from 'react';

import '../Home/Home.css';
import { Link } from "react-router-dom";
import cloudSVG from "../../assets/cloud.svg"

function Home(){
    return (
        <div className="cover-content">
            <div className="project-content">
                <span className='weather-wizard'>Weather Wizard</span>
                <img src={cloudSVG}></img>
            </div>
            <div className="project-nav">
                <ul>
                    <li><Link to="/forecast">FORECAST</Link></li>
                    <li><Link to="/about">ABOUT</Link></li>
                </ul>
            </div>
        </div>
    );

}

export default Home;