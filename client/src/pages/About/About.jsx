"use client";
import React from 'react';
import './About.css';
import '../../App.css';
import Header from '../../components/Header/Header';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.jsx';

import cloudSVG from '../../assets/Front Cloud Layer.svg'
import ClimateVarSVG from '../../assets/ClimVarSVG.svg'
import ClockSVG from '../../assets/ClockSVG.svg'
import GriddedEarth from '../../assets/GriddedEarth.svg'
import computerSVG from '../../assets/ComputerSVG.svg'
import cogSVG from '../../assets/cogSVG.svg'
import mlSVG from '../../assets/mlSVG.svg'
import cocoTeam from '../../assets/cocoTeam.png'

const About = () => {
  return (
    <div className='flex flex-col bg-white'>
      <ScrollToTop/>
      <Header></Header>
      <div className="">
        <div className='flex flex-col'>

          <section className='h-[calc(100vh-54px)] md:h-[calc(100vh-72px)] relative flex flex-col justify-center bg-[#2C74FF]'>
              <img src={cloudSVG} className='cloud-svg'></img>
              <div className='mb-32' style={{zIndex: '900'}}>
                <span className='text-black font-bold text-center tracking-widest'>A B O U T</span>
                <span className='text-white font-bold text-3xl sm:text-5xl text-center block'>Weather Wizard</span>
                <p className="text-white px-8 sm:px-24 text-center text-lg hyphens-auto pt-2 md:pt-4">
                  A temperature forecasting application using deep learning.
                </p>
              </div>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center py-12 md:py-0'>
            <span className='text-slate-500 font-bold text-2xl text-center'>Why Deep Learning?</span>
            <p className="text-slate-500 px-8 sm:px-28 text-left hyphens-auto pt-2">
              Traditional numerical weather prediction (NWP) models run complex physics simulations of the atmosphere using supercomputers. Alternatively, deep learning techniques can be used to achieve similar results with less complexity. We've trained select deep learning models to predict short-term forecasts and compare them to a state-of-the-art AI weather model through the <a href='https://developer.accuweather.com/accuweather-forecast-api/apis' target='_blank' className='text-sky-500 underline underline-offset-4'>AccuWeather API</a>.
            </p>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center bg-slate-50/50 py-8 md:py-8'>
            <div className='flex flex-col md:flex-row md:grid-cols-2 mt-4 px-8 sm:px-24'>
              <div className='pr-0 md:pr-6'>
                <span className='text-slate-700 font-bold text-2xl w-full '>Code[Coogs]</span>
                <p className="text-slate-600 text-left hyphens-auto pt-2 md:pt-4">
                  Weather Wizard is a Code[Coogs] team project. Code[Coogs] is the second largest computer science organization at the University of Houston focused on team projects, competitive programming, social events, workshops, and more. Team projects are semester/year-long projects where members get assigned to projects to work on and present at our end-of-the-year banquet.
                </p>
                <p className="text-slate-600 text-left hyphens-auto mt-8">
                  Want to get involved? Learn more about us <a href='https://www.codecoogs.com/' target='_blank' className='text-sky-500 hover:text-sky-500/50 underline underline-offset-4'>here</a>.
                </p>
              </div>
              <div className='w-fit h-fit mt-6 md:mt-0 md:min-w-[400px]'>
                <img src={cocoTeam} className='object-contain'></img>
              </div>
            </div>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center py-8 md:py-24 px-8 sm:px-24'>
            <span className='text-slate-500 font-bold text-2xl text-center'>Dataset</span>
            <p className="text-slate-500 text-left hyphens-auto pt-2 md:pt-4">
                Our models were trained using the ERA5-Land dataset. ERA5 is the fifth generation of European Centre for Medium-Range Weather Forecasts (ECMWF) climate reanalyses, providing hourly estimates of a large number of atmospheric, land, and oceanic climate variables.
            </p>
            <div className='grid grid-rows-2 grid-cols-1 gap-y-4 md:grid-rows-1 md:grid-cols-2 w-full mt-4'>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={ClockSVG} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Hourly data from 1950 to present</span>
              </div>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={GriddedEarth} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Projected on a 0.1&deg; x 0.1&deg; latitude-longitude grid.</span>
              </div>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={ClimateVarSVG} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Over 50 land climate variables</span>
              </div>
            </div>
            <p className="text-slate-500 text-left hyphens-auto bg-slate-50 border-2 border-slate-200 px-4 py-2 rounded-md mt-12">
              Dataset was generated using Copernicus Climate Change Service (C3S) information (2019) under the ECMWF and downloaded through the <a href='https://doi.org/10.24381/cds.e2161bac' target='_blank' className='text-sky-500 hover:text-sky-500/50 underline underline-offset-4'>Climate Data Store (CDS)</a> using their CDS API. 
            </p>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center bg-slate-50/50 py-8 md:py-24 px-8 sm:px-24'>
            <span className='text-slate-700 font-bold text-2xl text-center'>Technology</span>
            <p className="text-slate-600 text-left hyphens-auto pt-2 md:pt-4">
              Weather Wizard has been a great experience for learning new technologies and sharpening our programming skills. Here's a list of most of the stuff we used along our journey.
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-6 mt-6 w-full justify-between'>
              <div className='tech-card flex flex-col rounded-lg min-h-[200px]'>
                <div className='front shadow-lg flex flex-col w-full h-full justify-center items-center'>
                <img src={mlSVG} className='w-[70px] h-[50px]'></img>
                  <span className='text-slate-700 text-lg font-bold pt-4'>Machine Learning</span>
                </div>
                <div className='back flex shadow-lg px-6 py-2 justify-center items-center'>
                  <p className='text-slate-600 text-wrap text-center'>Python, NumPy, Pandas, Xarray, Matplotlib, Scikit-learn, TensorFlow & Jupyter Notebook</p>
                </div>
              </div>
              <div className='tech-card flex flex-col rounded-lg min-h-[200px]'>
                <div className='front shadow-lg flex flex-col w-full h-full justify-center items-center'>
                  <img src={computerSVG} className='w-[50px] h-[50px]'></img> 
                  <span className='text-slate-700 text-lg font-bold pt-4'>Web Development</span>
                </div>
                <div className='back flex shadow-lg px-6 py-2 justify-center items-center'>
                  <p className='text-slate-600 text-wrap text-center'>HTML, CSS, JavaScript, React, Tailwind & Flask</p>
                </div>
              </div>
              <div className='tech-card flex flex-col rounded-lg min-h-[200px]'>
                <div className='front shadow-lg flex flex-col w-full h-full justify-center items-center'>
                  <img src={cogSVG} className='w-[50px] h-[50px]'></img> 
                  <span className='text-slate-700 text-lg font-bold pt-4'>APIs / Libraries</span>
                </div>
                <div className='back flex shadow-lg px-6 py-2 justify-center items-center'>
                  <p className='text-slate-600 text-wrap text-center'>Google Maps JavaScript API, AccuWeather API & and ApexCharts.js</p>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default About;
