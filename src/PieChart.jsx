import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  const { label } = chartData;
  console.log(label);
  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          // Allow chart to occupy available space
          // maintainAspectRatio: false,
          // aspectRatio: 1,

          plugins: {
            title: {
              display: true,
              text: `Account by ${label}`,
              align: "start",
              padding: {
                top: 20,
              },
              font: {
                size: 18,
              },
            },
            legend: {
              position: "right",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
