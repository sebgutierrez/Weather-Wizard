import React, { Fragment } from "react"
import Header from "../../components/Header/Header"
import Card from "../../components/MemberCard/Card"
import sebJpg from "../../assets/seb.jpg"

const Team = () => {

const TeamMembers1 = [
    {
        id: 1,
        name: "Syeda Wasiq",
        year: "Sophomore",
        contribution: "",
        profileLink: "https://www.linkedin.com/in/syeda-wasiq-3a2160b4",
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
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
        image: "/default-profile-icon.png",
        reactTeam: false,
        apiTeam: false,
        teamLead: false,
        mlTeam: true
    }
]
const TeamMembers3 = [
    {
        id: 9,
        name: "Sean P.",
        year: "Senior",
        contribution: "",
        profileLink: "",
        image: "/default-profile-icon.png",
        reactTeam: false,
        apiTeam: false,
        teamLead: false,
        mlTeam: true
    }
]

  return (
    <div className="">
        <Header></Header>
        <div className="cards-container bg-white px-2 md:px-12">
            <div className="flex w-full justify-center pt-10">
                <span className="font-bold text-lg sm:text-xl md:text-3xl text-slate-700">Meet the Weather Wizards</span>
            </div>
            <div className='flex w-full pt-6'>
                <p className='text-md md:text-xl text-slate-500 mx-auto px-6 hyphens-auto'>We're a team of hobbyist programmers and members of Code[Coogs].</p>
            </div>
            <div className='my-8 mx-4 h-px bg-slate-900/10'></div>
            <div className="card-container mt-12 md:mt-12">
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
    </div>
    
    
  )
}

export default Team