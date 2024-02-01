import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
    const [time, setTime] = useState(60);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time}</div>;
};

export default CountdownTimer;
