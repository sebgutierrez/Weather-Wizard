import React, { useState, useRef, useEffect } from "react";

import leftScroll from "../../assets/leftScrollSVG.svg";
import rightScroll from "../../assets/rightScrollSVG.svg";

const TempCards = (props) => {
  const [cardsComputedWidth, setCardsComputedWidth] = useState(0);
  const cardsRef = useRef(null);
  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);
  const xPosition = useRef(0);

  const gapSizePx = 8;
  const cardSizePx = 120;
  const stride = 2;
  const cardsActualWidth = gapSizePx * 6 + cardSizePx * 7;

  function onRightScroll() {
    // On right scroll, a negative offset is the same as shifting the element to the right

    // check if computed width is less than actual width. larger screens don't have defined card widths
    if (cardsComputedWidth < cardsActualWidth) {
      // newOffset: how much to shift the cards by
      let newOffset = (cardSizePx + gapSizePx) * stride;
      // Bound checking:
      if (
        xPosition.current - newOffset >
        cardsActualWidth * -1 + cardsComputedWidth
      ) {
        xPosition.current -= newOffset;
      } else {
        xPosition.current = cardsActualWidth * -1 + cardsComputedWidth;
      }
      cardsRef.current.style.transform = `translateX(${xPosition.current}px)`;
    }
  }

  function onLeftScroll() {
    // On left scroll, a positive offset is the same as shifting the element to the left
    if (cardsComputedWidth < cardsActualWidth) {
      let newOffset = (cardSizePx + gapSizePx) * stride;
      // Bound checking. Only difference is ...
      if (xPosition.current + newOffset < cardsComputedWidth * -1) {
        xPosition.current += newOffset;
      } else {
        xPosition.current = 0;
      }
      cardsRef.current.style.transform = `translateX(${xPosition.current}px)`;
    }
  }

  function handleResize() {
    setCardsComputedWidth(cardsRef.current.offsetWidth);
  }

  useEffect(() => {
    if (cardsRef.current) {
      setCardsComputedWidth(cardsRef.current.offsetWidth);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (cardsRef.current) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [cardsRef]);

  let listItems = [];

  if (props.isCelsius) {
    listItems = props.openWeatherData.c.map((temp, key) => {
      let rawTimeString = new Date(temp[0]).toLocaleTimeString()
      let timeString = rawTimeString.length === 11 ? rawTimeString.slice(0,2) + " " + rawTimeString.slice(-2) : rawTimeString.slice(0,1) + " " + rawTimeString.slice(-2)
      return (
        <li
          className="flex flex-col justify-center items-center relative min-w-[120px] px-6 py-8 rounded-md bg-[#2C74FF]"
          key={key}
        >
          <span className="text-white absolute top-2 left-2 text-left">
            {timeString}
          </span>{" "}
          <span className="text-white font-bold text-2xl pt-2">
            {temp[1].toFixed(1)}&deg;C
          </span>
        </li>
      );
    });
  } else {
    listItems = props.openWeatherData.f.map((temp, key) => {
      let rawTimeString = new Date(temp[0]).toLocaleTimeString()
      let timeString = rawTimeString.length === 11 ? rawTimeString.slice(0,2) + " " + rawTimeString.slice(-2) : rawTimeString.slice(0,1) + " " + rawTimeString.slice(-2)
      return (
        <li
          className="flex flex-col justify-center items-center relative min-w-[120px] px-6 py-8 rounded-md bg-[#2C74FF]"
          key={key}
        >
          <span className="text-white absolute top-2 left-2 text-left">
            {timeString}
          </span>
          <span className="text-white font-bold text-2xl pt-2">
            {temp[1].toFixed(1)}&deg;F
          </span>
        </li>
      );
    });
  }

  return (
    <div className="flex w-full">
      <img
        src={leftScroll}
        className="lg:hidden w-[25px] h-[60px] absolute -left-1 top-[6.4rem] sm:top-[4.9rem]"
        style={{ zIndex: 5 }}
        ref={leftScrollRef}
        onClick={onLeftScroll}
      ></img>
      <ol
        className="grid grid-flow-col justify-stretch gap-x-2 w-full"
        ref={cardsRef}
        style={{
          transitionDuration: "0.25s",
          transform: `translateX(${xPosition.current}px)`,
        }}
      >
        {listItems}
      </ol>
      <img
        src={rightScroll}
        className="lg:hidden w-[25px] h-[60px] absolute -right-1 top-[6.4rem] sm:top-[4.9rem]"
        style={{ zIndex: 5 }}
        ref={rightScrollRef}
        onClick={onRightScroll}
      ></img>
    </div>
  );
};
export default TempCards;
