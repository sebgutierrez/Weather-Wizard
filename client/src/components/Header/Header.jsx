import React, { useState } from "react";
import "../../App.css";
import "./Header.css";

import menuSVG from "../../assets/hamburger.svg";
import closeMenuSVG from "../../assets/closeMenu.svg";
import LogoIdeas from "../LogoIdeas/LogoIdeas";
import { Link, NavLink } from "react-router-dom"; // substitutes <a> tags

const Header = (props) => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const changeMenuDisplay = () => {
    setToggleMobileMenu((bool) => !bool);
  };

  return (
    <div className="relative min-w-[320px]" style={{ zIndex: "1000" }}>
      <header className="header justify-start md:justify-end">
        {/* <LogoIdeas></LogoIdeas> */}
        <div className="flex md:hidden">
          {toggleMobileMenu === true ? (
            <img
              src={closeMenuSVG}
              className="flex flex-col md:hidden px-3 py-1"
              onClick={changeMenuDisplay}
            />
          ) : (
            <img
              src={menuSVG}
              className="flex flex-col md:hidden px-3 py-1"
              onClick={changeMenuDisplay}
            />
          )}
        </div>
        <nav className="navbar hidden md:flex">
          <ul className="nav-list">
            <NavLink
              to="/"
              className={state =>
                "menu-item " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/forecast"
              className={state =>
                "menu-item " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Forecast
            </NavLink>
            <NavLink
              to="/about"
              className={state => 
                "menu-item " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/team"
              className={state => 
                "menu-item " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Forecast
            </NavLink>
          </ul>
        </nav>
      </header>
      {toggleMobileMenu === true ? (
        <nav className="flex md:hidden w-full justify-begin">
          <ul className="flex flex-col w-full px-2 py-2 bg-[#2C74FF] mobile-nav-shadow">
            <NavLink
              to="/"
              className={state =>
                "menu-item w-full pr-6 " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/forecast"
              className={state =>
                "menu-item w-full pr-6 " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Forecast
            </NavLink>
            <NavLink
              to="/about"
              className={state => 
                "menu-item w-full pr-6 " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/team"
              className={state => 
                "menu-item w-full pr-6 " + (state.isActive ? "bg-[#083999]" : "hover:bg-[#083999]")
              }
            >
              Forecast
            </NavLink>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Header;
