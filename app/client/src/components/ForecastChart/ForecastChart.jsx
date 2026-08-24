import React, { useState, useRef } from "react";
import Chart from "react-apexcharts";
import "./ForecastChart.css";

function convertToSeries(regionalModels, lineType){
  let regionDLSeries = []
  for (const [model, forecast] of Object.entries(regionalModels)){
    let seriesTemps = []
    forecast.forEach((point) => {
      seriesTemps.push({
        x: new Date(point.timestamp).getTime(),
        y: Math.round(point.temperature),
      })
    })
    let seriesObject = {
      name: model,
      type: lineType,
      data: seriesTemps
    }
    regionDLSeries.push(seriesObject)
  }
  return regionDLSeries
}

function searchForMinVal(series){
  let min = 0
  return min
}

const ForecastChart = (props) => {
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "line",
        type: "line",
        // stacked: true,
        toolbar: {
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          }
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
        tickPlacement: "between",
        stepSize: 1,
        min: new Date("2025-06-16T00:00:00").getTime(),
        max: new Date("2025-06-16T06:00:00").getTime(),
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
          offsetX: -30
        },
        stepSize: 3
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
        width: 4
      },
      plotOptions: {
        // area: {
        //   fillTo: "end",
        // },
      },
      fill: {
        type: 'solid',
        opacity: [0.8, 0.8, 0.8],
      },
      // fill: {
      //   type: 'line',
      //   gradient: {
      //     opacityFrom: 0.6,
      //     opacityTo: 0.8,
      //   }
      // },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 8,
        onItemClick: {
          toggleDataSeries: true,
        },
      },
    },
  });

  let dLModelSeries = convertToSeries(props.modelData[props.regionInfo.region], "line")
  let apiModelSeries = convertToSeries(props.apiData[props.regionInfo.region], "line")

  const [series, setSeries] = useState({
    series: [
      ...dLModelSeries,
      ...apiModelSeries
    ]
  });

  const [prevIsCelsius, setPrevIsCelsius] = useState(props.isCelsius);
  const isCelsiusRef = useRef(props.isCelsius);

  function updateChart() {
    setOptions({
      options: {
        ...options.options
      }
    });
    setSeries({
      series: [
        ...dLModelSeries,
        ...apiModelSeries
      ]
    })
  }

  if (props.isCelsius !== prevIsCelsius) {
    setPrevIsCelsius(props.isCelsius);
    isCelsiusRef.current = props.isCelsius;
    updateChart();
  }

  return (
    <div className="w-full md:min-w-[600px]">
      <Chart
        className="relative px-0 md:pl-2 left-0" 
        options={options.options}
        series={series.series}
        type="line"
        width="100%"
        height="400px"
      />
    </div>
  );
};
export default ForecastChart;
