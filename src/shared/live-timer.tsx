import React, { useState, useEffect } from 'react';

const TimeCounter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
<span className='ml-2 text-primary font-bold'>{formattedTime}</span>  );
};

export default TimeCounter;
