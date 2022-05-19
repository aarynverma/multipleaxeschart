import * as React from "react";
import * as ReactDom from "react-dom";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// var newbaselinecost = baselinecost[0];

const App = (props: HighchartsReact.Props) => {
  const [baselineCost, setBaselineCost] = React.useState<any>([]);
  const [actualCost, setActualCost] = React.useState<any>([]);
  const [actualThm, setActualThm] = React.useState<any>([]);
  const [baselineThm, setBaselineThm] = React.useState<any>([]);
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);
  console.log("baseline", baselineCost);
  console.log("actual", actualCost);

  const toBeDisplay = {
    data: {
      organizationId: "id12be10fd-c679-476b-aeb2-2c719f594250",
      organizationName: "ATS",
      aggregationsStartDate: "2021-01-01",
      aggregationsEndDate: "2021-06-30",
      utilityType: "gas",
      utilityMeasurementUnit: "thm",
      utilityCostCurrency: "USD",
      regions: [
        {
          regionId: "APAC",
          regionName: "Asia Pacific",
          facilities: [
            {
              facilityId: "EOM78238283292345",
              facilityName: "Green Heights",
              totalAggregations: {
                totalActualConsumption: 107,
                totalBaselineConsumption: 96,
                totalActualCost: 107,
                totalBaselineCost: 96,
                totalCostSavings: 11,
                totalConsumptionSavingsPercentage: 20.7,
                totalConsumptionSavings: 11,
                totalCostSavingsPercentage: 20.7,
              },
              monthwiseAggregations: [
                {
                  actualConsumption: 2000,
                  actualCost: 2000,
                  baselineConsumption: 3000,
                  baselineCost: 3000,
                  monthStartDate: "2021-01-01",
                  monthEndDate: "2021-01-31",
                  isCompleted: true,

                  consumptionProcessedDays: 15,
                },
                {
                  actualConsumption: 2000,
                  actualCost: 2000,
                  baselineConsumption: 3000,
                  baselineCost: 3000,
                  monthStartDate: "2021-02-01",
                  monthEndDate: "2021-02-28",
                  isCompleted: true,
                  consumptionProcessedDays: 15,
                },
                {
                  actualConsumption: 2000,
                  actualCost: 3000,
                  baselineConsumption: 3000,
                  baselineCost: 1000,
                  monthStartDate: "2021-03-01",
                  monthEndDate: "2021-03-31",
                  isCompleted: true,
                  consumptionProcessedDays: 15,
                },
                {
                  actualConsumption: 2000,
                  actualCost: 5000,
                  baselineConsumption: 3000,
                  baselineCost: 3000,
                  monthStartDate: "2021-04-01",
                  monthEndDate: "2021-04-30",
                  isCompleted: true,
                  consumptionProcessedDays: 15,
                },
                {
                  actualConsumption: 2000,
                  actualCost: 3000,
                  baselineConsumption: 3000,
                  baselineCost: 3000,
                  monthStartDate: "2021-05-01",
                  monthEndDate: "2021-05-31",
                  isCompleted: false,
                  consumptionProcessedDays: 24,
                },
                {
                  actualConsumption: 2000,
                  actualCost: 2000,
                  baselineConsumption: 3000,
                  baselineCost: 3000,
                  monthStartDate: "2021-06-01",
                  monthEndDate: "2021-06-30",
                  isCompleted: true,
                  consumptionProcessedDays: 15,
                },
              ],
              utilityMeters: [
                {
                  meterId: "",
                  meterNumber: "Meter1",
                  meterType: "",
                  aggregations: {
                    actualConsumption: 2000,
                    actualCost: 2000,
                    baselineConsumption: 3000,
                    baselineCost: 3000,
                    totalCostSavings: 11,
                    totalCostSavingsPercentage: 20.7,
                    totalConsumptionSavings: 11,
                    totalConsumptionSavingsPercentage: 20.7,
                  },
                },
                {
                  meterId: "",
                  meterNumber: "Meter2",
                  meterType: "",
                  aggregations: {
                    actualConsumption: 2000,
                    actualCost: 2000,
                    baselineConsumption: 3000,
                    baselineCost: 3000,
                    totalCostSavings: 11,
                    totalCostSavingsPercentage: 20.7,
                    totalConsumptionSavings: 13.3,
                    totalConsumptionSavingsPercentage: 10.5,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

  const options = {
    xAxis: {
      categories: ["Jan", "Feb", "March", "April", "May", "June"],
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: " ",
        },
        title: {
          text: "",
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: "",
        },
        labels: {
          format: "{value} thm",
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: "",
        },
        labels: {
          format: `$ {value} `,
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: "thm baseline",
        type: "column",
        yAxis: 1,
        data: baselineThm,
        tooltip: {
          valueSuffix: "thm",
        },
      },
      {
        name: "thm actual",
        type: "column",
        yAxis: 2,
        data: actualThm,

        tooltip: {
          valueSuffix: "thm",
        },
      },

      {
        name: "$ baseline cost",
        type: "spline",
        yAxis: 2,
        data: baselineCost,

        marker: {
          enabled: false,
        },
        dashStyle: "shortdot",
        tooltip: {
          valueSuffix: "$",
        },
      },
      {
        name: "$ actual cost",
        type: "spline",
        data: actualCost,
        tooltip: {
          valueSuffix: "$",
        },
      },
    ],
  };

  React.useEffect(() => {
    setBaselineCost(
      toBeDisplay.data.regions.map((data) =>
        data.facilities.map((datainner) =>
          datainner.monthwiseAggregations.map(
            (datainnerchild) => datainnerchild.baselineCost
          )
        )
      )[0][0]
    );
  }, []);

  React.useEffect(() => {
    setActualThm(
      toBeDisplay.data.regions.map((data) =>
        data.facilities.map((datainner) =>
          datainner.monthwiseAggregations.map(
            (datainnerchild) => datainnerchild.actualConsumption
          )
        )
      )[0][0]
    );
  }, []);

  React.useEffect(() => {
    setActualCost(
      toBeDisplay.data.regions.map((data) =>
        data.facilities.map((datainner) =>
          datainner.monthwiseAggregations.map(
            (datainnerchild) => datainnerchild.actualCost
          )
        )
      )[0][0]
    );
  }, []);

  React.useEffect(() => {
    setBaselineThm(
      toBeDisplay.data.regions.map((data) =>
        data.facilities.map((datainner) =>
          datainner.monthwiseAggregations.map(
            (datainnerchild) => datainnerchild.baselineConsumption
          )
        )
      )[0][0]
    );
  }, []);

  return (
    // ye typescript with port 3001
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default App;
