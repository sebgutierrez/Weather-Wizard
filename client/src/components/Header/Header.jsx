import React, { useState } from "react";
import "../../App.css";
import "./Header.css";

import menuSVG from "../../assets/hamburger.svg";
import closeMenuSVG from "../../assets/closeMenu.svg";
import LogoIdeas from "../LogoIdeas/LogoIdeas";
import { Link } from "react-router-dom"; // substitutes <a> tags

const Header = () => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const changeMenuDisplay = () => {
    setToggleMobileMenu((bool) => !bool);
  };

  return (
    <div className="fixed min-w-[320px]" style={{ zIndex: "1000" }}>
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
            <li className="menu-item-container hover:bg-[#083999] rounded-md">
              <Link to="/" className="menu-item">
                Home
              </Link>
            </li>
            <li className="menu-item-container hover:bg-[#083999] rounded-md">
              <Link to="/forecast" className="menu-item">
                Forecast
              </Link>
            </li>
            <li className="menu-item-container hover:bg-[#083999] rounded-md">
              <Link to="/about" className="menu-item">
                About
              </Link>
            </li>
            <li className="menu-item-container hover:bg-[#083999] rounded-md">
              <Link to="/team" className="menu-item">
                Team
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {toggleMobileMenu === true ? (
        <nav className="flex md:hidden w-full justify-begin">
          <ul className="flex flex-col w-full px-2 py-2 bg-[#2C74FF] mobile-nav-shadow">
            <li className="menu-item-container pl-2 w-full justify-start">
              <Link to="/" className="menu-item w-full pr-6">
                Home
              </Link>
            </li>
            <li className="menu-item-container pl-2 w-full justify-start">
              <Link to="/forecast" className="menu-item w-full pr-6">
                Forecast
              </Link>
            </li>
            <li className="menu-item-container pl-2 w-full justify-start">
              <Link to="/about" className="menu-item w-full pr-6">
                About
              </Link>
            </li>
            <li className="menu-item-container pl-2 w-full justify-start">
              <Link to="/team" className="menu-item w-full pr-6">
                Team
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Header;
