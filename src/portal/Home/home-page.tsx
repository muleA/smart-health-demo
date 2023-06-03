import { BookTwoTone,  CheckCircleTwoTone,  CloseCircleTwoTone, InfoCircleTwoTone} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import CounterCard from "./Components/counter-card";
import TableCard from './Components/table-card';
import ProgressChartCard from './Components/progress-chart-card';

export default function HomePage(){
  const router=useNavigate();
  const Headers = [
    {
      text: 'Total License',
      bg: 'bg-blue-100',
      color: '#0066FF',
      icon: <BookTwoTone  twoToneColor="#0066FF"style={{fontSize: '25px',}} />,
      count: 108,
    },
    {
      text: 'Pending Licenses',
      bg: 'bg-yellow-100',
      color: '#F8B219',
      icon: <InfoCircleTwoTone twoToneColor="#F8B219"  style={{fontSize: '25px',}}/>,
      count: 53,
    },
    {
      text: 'Approved Licenses',
      bg: 'bg-green-100',
      color: '#52c41a',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '25px',}} />,
      count: 32,
    },
    {
      text: 'Rejected Licenses',
      bg: 'bg-red-100',
      color: '#FF0000',
      icon: <CloseCircleTwoTone twoToneColor="#FF0000" style={{fontSize: '25px',}}/>,
      count: 12,
    },
  ];
  
  return(
    <>
    <div className="p-4 gap-4 flex flex-col gap-4">
        <div className="flex flex-wrap ">
          {Headers.map((header, h) => (
            <CounterCard header={header} key={h} />
          ))}
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