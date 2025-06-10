import React, { useState, useRef } from "react";
import Chart from "react-apexcharts";
import "./ForecastChart.css";

const ForecastChart = (props) => {
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "area",
        type: "area",
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        zoom: false,
        animations: {
          enabled: false,
        },
        events: {
          mounted: (chart) => {
            chart.windowResizeHandler();
          },
        },
        redrawOnParentResize: true,
      },
      grid: {
        show: true,
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          right: 20,
          left: -20
        },
        strokeDashArray: 3
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tickPlacement: "on",
        stepSize: 3,
        min: new Date().getTime(),
        max: new Date().getTime() + 21 * 60 * 60 * 1000,
        labels: {
          offsetX: 0,
          offsetY: 0,
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM dd",
            day: "MMM dd",
            hour: 'hh TT',
          },
        },
        axisTicks: {
          offsetX: 0,
          offsetY: 0,
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (value, options) {
            /* For some reason, the state prop celsius doesn't change inside the function, need to use reference instead */
            if (isCelsiusRef.current) {
              return `${value}°C`;
            } else {
              return `${value}°F`;
            }
          }, 
          offsetX: -32
        },
        stepSize: 4
      },
      tooltip: {
        enabled: true,
        formatter: function (value, options) {
          /* For some reason, the state prop celsius doesn't change inside the function, need to use reference instead */
          if (isCelsiusRef.current) {
            return `${value}°C`;
          } else {
            return `${value}°F`;
          }
        }, 
        x: {
          format: "hh:mm TT",
        },
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      plotOptions: {
        area: {
          fillTo: "end",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.75,
          opacityTo: 0.5,
        },
      },
      legend: {
        show: false,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 4,
        offsetY: 12,
        onItemClick: {
          toggleDataSeries: false,
        },
      },
    },
  });

  let regionFTemps = Array.from(props.apiData[props.regionName].f)
  let regionCTemps = Array.from(props.apiData[props.regionName].c)

  const [series, setSeries] = useState({
    series: [
      {
        name: "Model",
        data: regionFTemps.map((data, key) => {
          return {
            x: data[0],
            y: data[1].toFixed(1),
          };
        }),
      },
    ],
  });
  const [prevIsCelsius, setPrevIsCelsius] = useState(props.isCelsius);
  const isCelsiusRef = useRef(props.isCelsius);

  function flipIsCelsius() {
    setOptions({
      options: {
        ...options.options,
      },
    });
    
    if (props.isCelsius) {
      setSeries({
        series: [
          {
            name: "Model",
            data: regionCTemps.map((data, key) => {
              return {
                x: data[0],
                y: data[1].toFixed(1),
              };
            }),
          },
        ],
      });
    } else {
      setSeries({
        series: [
          {
            name: "Model",
            data: regionFTemps.map((data, key) => {
              return {
                x: data[0],
                y: data[1].toFixed(1),
              };
            }),
          },
        ],
      });
    }
  }
  if (props.isCelsius !== prevIsCelsius) {
    setPrevIsCelsius(props.isCelsius);
    isCelsiusRef.current = props.isCelsius;
    flipIsCelsius();
  }

  return (
    <div className="w-full md:min-w-[600px] border-slate-300 rounded-md">
      <Chart
        className="overflow-x-hidden overflow-y-hidden relative px-1 md:px-2"
        options={options.options}
        series={series.series}
        type="area"
        width="100%"
        height="250px"
      />
    </div>
  );
};
export default ForecastChart;
