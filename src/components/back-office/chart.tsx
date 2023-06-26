import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Chart = ({ data }:any) => {
  const processDataForBarChart = (inputData: Array<any>) => {

  let processedData: {[key: string]: number} = {};

  data?.forEach((item: { status: string | number; }) => {
    if (processedData[item.status]) {
      processedData[item.status]++;
    } else {
      processedData[item.status] = 1;
    }
  });

  return Object.entries(processedData)?.map(([statusName, count]) => ({
    name: statusName,
    value: count
  }));
};

const chartData = processDataForBarChart(data);  

    return (
      <div className="w-full">
        <h2 className="text-xl mb-4">Applications Bar Chart (Pending,Approved)</h2>
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
 

      </div>
    );
  };
  
  export default Chart;
  