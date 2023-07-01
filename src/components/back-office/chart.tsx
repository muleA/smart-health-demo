import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';


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
            <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">
        
        <h2 className="text-xl mb-4">Applications Bar Chart for Pendingand Approved applications </h2>
        <BarChart width={450} height={450} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
  </div>
{/*   <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">

        <h2 className="text-xl  font-bold mt-8 mb-4">Line Chart</h2>
        <LineChart width={1000} height={450} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip /> 
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart> 
</div> */}
 

      </div>
    );
  };
  
  export default Chart;
  