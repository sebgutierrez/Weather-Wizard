import React, { useState } from "react";
import "../../App.css";
import "./Header.css";

import menuSVG from "../../assets/dark-hamburger.svg";
import closeMenuSVG from "../../assets/dark-close-menu.svg";
import blackWizHatSVG from "../../assets/black-wiz-hat.svg";
import cloudSVG from "../../assets/cloud.svg";
import { NavLink } from "react-router-dom"; // substitutes <a> tags

const Header = (props) => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const changeMenuDisplay = () => {
    setToggleMobileMenu((bool) => !bool);
  };

  return (
    <div className="relative min-w-[320px]" style={{ zIndex: "1000" }}>
      <header className="header relative justify-start md:justify-end">
        <div className="flex md:hidden">
          {
            toggleMobileMenu === true ? (
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
            )
          }
        </div>
        <NavLink to="/"><img src={cloudSVG} className="object-contain w-[64px] h-[64px] ml-[8px] mt-[8px] md:ml-[24px] md:mt-[12px]"/></NavLink>
        <nav className="navbar hidden md:flex">
          <ul className="nav-list">
            <NavLink
              to="/"
              className={state =>
                "menu-item " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/forecast"
              className={state =>
                "menu-item " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
              }
            >
              Forecast
            </NavLink>
            <NavLink
              to="/about"
              className={state => 
                "menu-item " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
              }
            >
              About
            </NavLink>
          </ul>
        </nav>
      </header>
      {
        toggleMobileMenu && (
          <nav className="flex md:hidden w-full justify-begin bg-white">
            <ul className="flex flex-col w-full px-2 py-2 mobile-nav-shadow">
              <NavLink
                to="/"
                className={state =>
                  "menu-item w-full pr-6 " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/forecast"
                className={state =>
                  "menu-item w-full pr-6 " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
                }
              >
                Forecast
              </NavLink>
              <NavLink
                to="/about"
                className={state => 
                  "menu-item w-full pr-6 " + (state.isActive ? "bg-[#2C74FF] font-bold text-white" : "hover:bg-[#2C74FF]")
                }
              >
                About
              </NavLink>
            </ul>
          </nav>
        )
      }
    </div>
  );
};

export default Header;
