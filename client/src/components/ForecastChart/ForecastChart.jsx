import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./ForecastChart.css";

const ForecastChart = (props) => {
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "line",
        type: "line",
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
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        events: {
          mounted: (chart) => {
            chart.windowResizeHandler();
          },
        },
      },
      grid: {
        strokeDashArray: 2,
      },
      legend: {
        showForSingleSeries: true,
        position: "top",
        offsetX: 16,
        offsetY: 16,
      },
      xaxis: {
        type: "datetime",
        tickPlacement: "on",
        min: new Date("2023/12/24").getTime() - 0 * 3.6e6,
        max: new Date("2024/01/04").getTime() + 0 * 3.6e6,
        labels: {
          offsetX: 0,
          offsetY: 0,
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM dd",
            day: "MMM dd",
          },
        },
        axisTicks: {
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        showAlways: true,
        labels: {
          formatter: (value) => {
            if (props.isCelsius) {
              return `${value}°C`;
            } else {
              return `${value}°F`;
            }
          },
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: false,
        x: {
          format: "MMM dd",
        },
        fixed: {
          enabled: false,
          offsetX: 100,
          offsetY: -100,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const hoverXaxis = w.globals.seriesX[seriesIndex][dataPointIndex];
          const hoverIndexes = w.globals.seriesX.map((seriesX) => {
            return seriesX.findIndex((xData) => xData === hoverXaxis);
          });
          let hoverList = "";
          hoverIndexes.forEach((hoverIndex, seriesEachIndex) => {
            if (
              hoverIndex >= 0 &&
              w.globals.collapsedSeriesIndices.includes(seriesEachIndex) ===
                false
            ) {
              hoverList += `
								<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex; z-index: 100;">
									<span class="apexcharts-tooltip-marker" style="background-color: ${
                    w.globals.markers.colors[seriesEachIndex]
                  };"></span>
									<div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
										<div class="apexcharts-tooltip-y-group">
											<span class="apexcharts-tooltip-text-y-label">${
                        w.globals.seriesNames[seriesEachIndex]
                      }: </span>
											<span class="apexcharts-tooltip-text-y-value">${w.globals.yLabelFormatters[0](
                        series[seriesEachIndex][hoverIndex],
                      )}</span>
										</div>
									</div>
								</div>`;
            }
          });
          const parsed = new Date(hoverXaxis).toUTCString().split(" ").slice(1);
          return `<div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; z-index: 300;">${
            parsed[1] + " " + parsed[0] + " " + parsed[2]
          }</div>${hoverList}`;
          // <div class="apexcharts-tooltip apexcharts-theme-light apexcharts-active" style="left: 126.367px; top: 75.539px;"></div>
        },
      },
      annotations: {
        xaxis: [
          {
            x: new Date("2023/12/30").getTime(),
            strokeDashArray: 3,
            borderColor: "#c2c2c2",
            fillColor: "#c2c2c2",
            opacity: 0.75,
            label: {
              borderColor: "#c2c2c2",
              borderWidth: 1,
              borderRadius: 2,
              text: "Forecast",
              textAnchor: "end",
              position: "bottom",
              orientation: "horizontal",
              offsetX: 54,
              offsetY: -5,
              mouseEnter: undefined,
              mouseLeave: undefined,
              click: undefined,
              style: {
                background: "#fff",
                color: "#777",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-xaxis-annotation-label",
              },
            },
          },
          {
            x: new Date("2023/12/30").getTime(),
            strokeDashArray: 3,
            borderColor: "#c2c2c2",
            fillColor: "#c2c2c2",
            opacity: 0.75,
            label: {
              borderColor: "#c2c2c2",
              borderWidth: 1,
              borderRadius: 2,
              text: "Historical",
              textAnchor: "end",
              position: "bottom",
              orientation: "horizontal",
              offsetX: -7,
              offsetY: -5,
              mouseEnter: undefined,
              mouseLeave: undefined,
              click: undefined,
              style: {
                background: "#fff",
                color: "#777",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: "apexcharts-xaxis-annotation-label",
              },
            },
          },
        ],
      },
      markers: {
        size: 0,
        hover: {
          size: undefined,
        },
      },
    },
  });
  const [series, setSeries] = useState({
    series: [
      {
        name: "AccuWeather",
        data: props.openWeatherData.f.map((data, key) => {
          return {
            x: data[0],
            y: data[1].toFixed(1),
          };
        }),
      },
      {
        name: "Long Short-Term Memory",
        data: props.modelData.f.slice(6).map((data, key) => {
          return {
            x: data[0],
            y: data[1].toFixed(1),
          };
        }),
      },
    ],
  });

  const [prevCelsius, setPrevCelsius] = useState(props.isCelsius);
  const [chartKey, setChartKey] = useState(0);

  function flipIsCelsius() {
    if (props.isCelsius) {
      setOptions({
        options: {
          ...options.options,
          yaxis: {
            showAlways: true,
            labels: {
              formatter: (value) => {
                if (props.isCelsius) {
                  return `${value}°C`;
                } else {
                  return `${value}°F`;
                }
              },
            },
          },
        },
      });
      setSeries({
        series: [
          {
            name: "AccuWeather",
            data: props.openWeatherData.c.map((data, key) => {
              return {
                x: data[0],
                y: data[1].toFixed(1),
              };
            }),
          },
          {
            name: "Long Short-Term Memory",
            data: props.modelData.c.slice(6).map((data, key) => {
              return {
                x: data[0],
                y: data[1].toFixed(1),
              };
            }),
          },
        ],
      });
    } else {
      setOptions({
        options: {
          ...options.options,
          yaxis: {
            showAlways: true,
            labels: {
              formatter: (value) => {
                if (props.isCelsius) {
                  return `${value}°C`;
                } else {
                  return `${value}°F`;
                }
              },
            },
          },
        },
      });
      setSeries({
        series: [
          {
            name: "AccuWeather",
            data: props.openWeatherData.f.map((data, key) => {
              return {
                x: data[0],
                y: data[1].toFixed(1),
              };
            }),
          },
          {
            name: "Long Short-Term Memory",
            data: props.modelData.f.slice(6).map((data, key) => {
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

  if (props.isCelsius !== prevCelsius) {
    setPrevCelsius(props.isCelsius);
    setChartKey((key) => {
      return key + 1;
    });
    flipIsCelsius();
  }

  return (
    <div className="min-w-[250px] sm:min-w-[400px] md:min-w-[600px] md:w-full border-2 px-2 rounded-md overflow-visible">
      <Chart
        className=""
        key={chartKey}
        options={options.options}
        series={series.series}
        type="line"
        width="100%"
        height="250px"
      />
    </div>
  );
};
export default ForecastChart;
