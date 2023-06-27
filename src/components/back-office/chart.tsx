import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Chart = ({ data }:any) => {
<<<<<<< HEAD
  const chartData = [{name:12,value:34},{name:1,value:4},{name:13,value:24},{name:12,value:54},{name:2,value:24},{name:6,value:64},{name:2,value:4},{name:8,value:84},{name:12,value:24},{name:7,value:75},{name:9,value:95},{name:4,value:50}]
  
=======
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
>>>>>>> yaregal

    return (
      <div className="w-full">
            <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">
        
        <h2 className="text-xl mb-4">Applications Bar Chart (Pending,Approved)</h2>
        <BarChart width={1000} height={450} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
<<<<<<< HEAD
  </div>
  <div className="bg-white p-5 rounded-2xl shadow-lg mr-4 mb-2">

        <h2 className="text-xl  font-bold mt-8 mb-4">Line Chart</h2>
        <LineChart width={1000} height={450} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip /> 
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart> 
</div>
=======
 

>>>>>>> yaregal
      </div>
    );
  };
  
  export default Chart;
  