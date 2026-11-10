'use client';

import { createContext, useContext, useState } from 'react';

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{ loading, setLoading, report, setReport, reports, setReports }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
