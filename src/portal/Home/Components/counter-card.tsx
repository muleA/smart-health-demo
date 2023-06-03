import React from 'react';

export interface CounterCardHeaderProps {
  header: any;
}

function CounterCard(props: CounterCardHeaderProps) {
  return (
    <div className=" w-full sm:w-1/4">
      <div className="bg-white p-5 rounded-2xl shadow-lg mr-4">
        <div className="flex gap-3">
          <div className= " p-5 ">
            {props.header.icon}
          </div>

          <div className="flex flex-col justify-between">
            <div className="font-bold text-xl " >
              {props.header.text}
            </div>
            <span
              className=" text-blue-500 text-lg font-bold"
              style={{ color: props.header.color }}
            >
              {props.header.count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterCard;
