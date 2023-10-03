// TimeContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const TimeContext = createContext();

export const useTime = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
      now.getSeconds()
    ).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <TimeContext.Provider value={{ currentDate }}>
      {children}
    </TimeContext.Provider>
  );
};
