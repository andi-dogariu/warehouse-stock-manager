import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, DoughnutController, Tooltip} from 'chart.js'

const MakePieChart = ({data}) => {
  Chart.register(ArcElement, CategoryScale, DoughnutController, Tooltip);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let index = context.dataIndex;
            let make = context.chart.data.labels[index];
            let count = context.chart.data.datasets[0].data[index];
            console.log(`index=${index}, make=${make}, count=${count}`, count);
            return `${count['name']}: ${count['value']}`;
          },
        },
      },
    }
  }

  return <Pie data={chartData}
    options={options}
    height={200}
  />;
}
export default MakePieChart;