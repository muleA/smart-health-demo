import { useNavigate } from "react-router-dom";
import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';



export default function HomePage(){
  const router=useNavigate();
  
  
  return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
        <div >
            <CounterCard/>
        </div>
        <div style={{ display: 'flex' }} className="flex gap-4">
          <div style={{ flex: '8' }}>
            <TableCard />
          </div>
          <div style={{ flex: '2' }}>
            <ProgressChartCard />
          </div>
        </div>
        </div>
    </>
  )
}