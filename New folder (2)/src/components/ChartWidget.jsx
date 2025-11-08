import { Bar } from 'react-chartjs-2';
function ChartWidget({ data, options }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
}
export default ChartWidget;
