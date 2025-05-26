import React, { useState, useRef } from "react";
import Chart from "react-apexcharts";
import "./HistoricalChart.css";

const HistoricalChart = (props) => {
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
          right: 24,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tickPlacement: "on",
        min: new Date("2025-05-24T00:00:00").getTime(),
        max: new Date("2025-05-25T00:00:00").getTime(),
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
  const [series, setSeries] = useState({
    series: [
      {
        name: "Model",
        data: props.openWeatherData.f.map((data, key) => {
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
            data: props.openWeatherData.c.map((data, key) => {
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
            data: props.openWeatherData.f.map((data, key) => {
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
    <div className="min-w-[600px] sm:w-full border-2 border-slate-400 rounded-md">
      <Chart
        className="overflow-x-auto overflow-y-hidden px-2.5"
        options={options.options}
        series={series.series}
        type="area"
        width="100%"
        height="250px"
      />
    </div>
  );
};
export default HistoricalChart;
