import React from 'react';
import './About.css';
import '../../App.css';
import Header from '../../components/Header/Header';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.jsx';

import cloudSVG from '../../assets/foreground-cloud.svg'
import earthOutlineSVG from '../../assets/earth-outline.svg'
import clockSVG from '../../assets/clock.svg'
import gridEarthSVG from '../../assets/grid-earth.svg'
import cocoTeamPNG from '../../assets/coco-team.png'
import leftForegroundCloudSVG from '../../assets/Left-foreground-cloud.svg';
import rightForegroundCloudSVG from '../../assets/right-foreground-cloud.svg';

import Card from "../../components/MemberCard/Card";
import sebJpg from "../../assets/seb.jpg";
import defaultProfileIconPNG from "../../assets/default-profile-icon.png";

const TeamMembers1 = [
    {
        id: 1,
        name: "Syeda Wasiq",
        year: "Sophomore",
        contribution: "",
        profileLink: "https://www.linkedin.com/in/syeda-wasiq-3a2160b4",
        image: defaultProfileIconPNG,
        reactTeam: true,
        apiTeam: false,
        teamLead: false,
        mlTeam: false
    },{
        id: 2,
        name: "Sebastian Gutierrez",
        year: "Senior",
        contribution: "",
        profileLink: "https://www.linkedin.com/in/sebastian-gutierrez-363130216/",
        image: sebJpg,
        reactTeam: true,
        apiTeam: true,
        teamLead: true,
        mlTeam: true
    },{
        id: 3,
        name: "Nathan Tran",
        year: "Junior",
        contribution: "",
        profileLink: "https://www.linkedin.com/in/nathan-tran-190866265/",
        image: defaultProfileIconPNG,
        reactTeam: true,
        apiTeam: false,
        teamLead: false,
        mlTeam: false
    },{
        id: 4,
        name: "Dinh Bui",
        year: "Senior",
        contribution: "",
        profileLink: "https://www.linkedin.com/in/dbui02/",
        image: defaultProfileIconPNG,
        reactTeam: true,
        apiTeam: true,
        teamLead: false,
        mlTeam: true
    },
]
const TeamMembers2 = [
    {
        id: 5,
        name: "Chris Oosthuizen",
        year: "Junior",
        contribution: "",
        profileLink: "",
        image: defaultProfileIconPNG,
        reactTeam: false,
        apiTeam: false,
        teamLead: true,
        mlTeam: true
    },{
        id: 6,
        name: "Parsa Motahar",
        year: "Junior",
        contribution: "",
        profileLink: "",
        image: defaultProfileIconPNG,
        reactTeam: true,
        apiTeam: false,
        teamLead: false,
        mlTeam: true
    },{
        id: 7,
        name: "Chase Brock",
        year: "Junior",
        contribution: "",
        profileLink: "",
        image: defaultProfileIconPNG,
        reactTeam: true,
        apiTeam: false,
        teamLead: false,
        mlTeam: true
    },{
        id: 8,
        name: "Nico Mangilit",
        year: "Junior",
        contribution: "",
        profileLink: "",
        image: defaultProfileIconPNG,
        reactTeam: false,
        apiTeam: false,
        teamLead: false,
        mlTeam: true
    }
]

const About = () => {
  return (
    <div className='flex flex-col bg-white overflow-x-hidden'>
      <ScrollToTop/>
      <Header></Header>
      <div className="">
        <div className='flex flex-col'>

          <section className='h-[calc(100vh-54px)] md:h-[calc(100vh-72px)] relative flex flex-col justify-center about-hero-container'>
            <img src={cloudSVG} className='cloud-svg'></img>
            <div className='mb-32' style={{zIndex: '900'}}>
              <span className='text-black font-bold text-center tracking-widest'>A B O U T</span>
              <span className='text-white font-bold text-3xl sm:text-5xl text-center block'>Weather Wizard</span>
              <p className="text-white px-8 sm:px-24 text-center text-lg hyphens-auto pt-2 md:pt-4">
                A deep learning temperature forecasting application
              </p>
            </div>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center py-12 md:py-0 px-4 sm:px-28'>
            <div className="relative flex flex-col items-center bg-[#2C74FF] rounded-lg py-12 md:py-16 px-6 sm:px-12">
              <span className='text-white font-bold text-lg sm:text-2xl text-left'>Why Deep Learning?</span>
              <p className="text-white text-left hyphens-auto pt-4 sm:pb-4">
                Despite the general accuracy of physics-based weather prediction models, deep learning models have shown promise in achieving similar results with less complexity. We've developed and trained our own models following the state-of-the-art in deep learning, and have gained valuable hands-on experience building a deep learning web application. As the project matures, we expect to use our models to gain insights towards historical and future weather trends.
                {/* We have integrated Open Meteo's free weather API to provide our models with up-to-date weather conditions to<a href='https://developer.accuweather.com/accuweather-forecast-api/apis' target='_blank' className='text-white underline underline-offset-4'>API</a>. */}
              </p>
              <img src={leftForegroundCloudSVG} className="object-contain w-[140px] h-[100px] sm:w-[240px] sm:h-[120px] absolute -left-[32px] -bottom-[40px] sm:-left-[60px] sm:-bottom-[40px]"></img>
              <img src={rightForegroundCloudSVG} className="object-contain w-[140px] h-[100px] sm:w-[280px] sm:h-[120px] absolute -right-[32px] -bottom-[40px] sm:-bottom-[40px]"></img>
            </div>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center bg-white my-12 md:my-28'>
            <div className='flex flex-col md:flex-row md:grid-cols-2 mt-4 px-8 sm:px-24'>
              <div className='pr-0 md:pr-6'>
                <span className='text-slate-700 font-bold text-2xl w-full'>Code[Coogs]</span>
                <p className="text-slate-600 text-left hyphens-auto pt-8">
                  Weather Wizard is a Code[Coogs] team project. Code[Coogs] is the second largest computer science organization at the University of Houston focused on team projects, competitive programming, social events, workshops, and more. Team projects are semester/year-long projects where members can be assigned to projects to work on and present at our end-of-year banquet.
                </p>
                <p className="text-slate-600 text-left hyphens-auto mt-8">
                  Want to get involved? Learn more about us <a href='https://www.codecoogs.com/' target='_blank' className='text-sky-500 hover:text-sky-500/50 underline underline-offset-4'>here</a>.
                </p>
              </div>
              <div className='w-fit h-fit mt-6 md:mt-0 md:min-w-[400px]'>
                <img src={cocoTeamPNG} className='object-contain'></img>
              </div>
            </div>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center py-8 md:py-24 px-8 sm:px-24'>
            <span className='text-slate-700 font-bold text-2xl text-center'>Dataset</span>
            <p className="text-slate-500 text-left hyphens-auto pt-4 md:pt-8">
                Our models were trained using a subset of the ERA5-Land dataset. ERA5-Land provides data from ERA5 at an enhanced resolution for surface climate variables. ERA5 is the fifth generation of European Centre for Medium-Range Weather Forecasts (ECMWF) climate reanalyses, providing hourly estimates of a large number of atmospheric, land, and oceanic climate variables. For the sake of reducing the time it takes to download and train our models, our dataset includes...
            </p>
            <div className="mt-8 mb-4 px-0 h-px bg-slate-900/10"></div>
            <div className='grid grid-rows-2 grid-cols-1 gap-y-4 md:gap-y-8 md:grid-rows-1 md:grid-cols-2 w-full mt-4 md:mt-4'>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={clockSVG} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Hourly data from 2000 to 2024 at 3 hour intervals</span>
              </div>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={gridEarthSVG} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Regions sampled as a 5 x 5 coordinate grid at a 0.1&deg; x 0.1&deg; horizontal resolution about a region's capital</span>
              </div>
              <div className='flex align-center items-center'>
                <div className='p-1 sm:p-2 md:p-2.5 rounded-full bg-[#2C74FF] min-w-[56px] md:min-w-[68px]'>
                  <img src={earthOutlineSVG} className='w-[48px] h-[48px]'></img>
                </div>
                <span className='text-slate-500 px-4 text-left'>Includes <i>surface temperature</i> (t2m), <i>dewpoint temperature</i> (d2m), <i>surface pressure</i> (sp), <i>total precipitation</i> (tp), and <i>wind speed</i> (obtained from u10 and v10)</span>
              </div>
            </div>
            <p className="text-[#0284c7] text-left hyphens-auto bg-[#e0f2fe] px-4 py-2 rounded-md mt-12">
              Attribution: Dataset was generated using Copernicus Climate Change Service (C3S) information (2019) under the ECMWF and downloaded through the <a href='https://doi.org/10.24381/cds.e2161bac' target='_blank' className='text-sky-500 hover:text-sky-500/50 underline underline-offset-4'>Climate Data Store (CDS)</a> using their CDS API. 
            </p>
          </section>

          <section className='min-h-[60vh] flex flex-col justify-center bg-white py-4 md:py-24 px-8 sm:px-24'>
            <span className='text-slate-700 font-bold text-xl md:text-2xl text-center'>Meet the Weather Wizards</span>
            <div className="cards-container bg-white mt-8">
              <div className="card-container mt-12 md:mt-16">
                {
                  TeamMembers1.map((member) => (
                    <Card className="" data={member} key={member.id}></Card>
                  ))
                }
                </div>
                <div className="card-container mt-12 mb-6 md:mt-16">
                {
                  TeamMembers2.map((member) => (
                    <Card className="" data={member} key={member.id}></Card>
                  ))
                }
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default About;
