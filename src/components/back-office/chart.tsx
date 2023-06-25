import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Chart = ({ data }:any) => {
  const chartData = [{name:12,value:34},{name:1,value:4},{name:13,value:24},{name:12,value:54},{name:2,value:24},]
  

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
  
        <h2 className="text-xl  font-bold mt-8 mb-4">Line Chart</h2>
   {/*      <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>  */}

      </div>
    );
  };
  
  export default Chart;
  