// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { fetchData } from "./api";

Chart.register(CategoryScale);

const chartConfigs = [
  {
    label: "Industry",
    endpoint: "industry",
  },
  {
    label: "Revenue",
    endpoint: "revenue",
  },
  {
    label: "Country",
    endpoint: "country",
  },
  {
    label: "Region",
    endpoint: "continent",
  },
  { label: "ICP", endpoint: "icp" },
  {
    label: "List",
    endpoint: "list",
  },
  {
    label: "Employee",
    endpoint: "employees",
  },
];

export default function App() {
  const [chartDataList, setChartDataList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const dataPromises = chartConfigs.map(async (chartConfig) => {
        const data = await fetchData(chartConfig.endpoint);
        return {
          label: chartConfig.label,
          datasets: [
            {
              label: "Accounts",
              data: data.map((dataItem) => Object.values(dataItem)[0]),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#609DA1",
                "#A2C6C8",
                "#CCDFE1",
                "#DFEBEC",
              ],
              borderColor: "white",
              borderWidth: 2,
            },
          ],
          labels: data.map((dataItem) => Object.keys(dataItem)[0]),
        };
      });
      const dataResults = await Promise.all(dataPromises);
      setChartDataList(dataResults);
    } catch (error) {
      console.log("Error fetching data:", error);
      setChartDataList([]);
    }
  };

  if (!chartDataList.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <div className="page-container">
        {/* data part */}
        <div className="charts-container">
          <div className="total-data">
            <p>Total ICP Account</p>
            <h2>2567</h2>
          </div>
          <div className="total-data">
            <p>Total ICP Contacts</p>
            <h2>3,200</h2>
          </div>
          <div className="total-data">
            <p>Contacts/ICP Accounts</p>
            <h2>1.24</h2>
          </div>

          {/* charts part */}
          {chartDataList.map((chartData, index) => (
            <PieChart key={index} chartData={chartData} />
          ))}
        </div>
      </div>
    </div>
  );
}
