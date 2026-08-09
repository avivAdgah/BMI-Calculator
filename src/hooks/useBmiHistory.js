import { useEffect, useState } from 'react';
import { formatDate } from '../utils/bmi';
import { getHistory, saveHistory, clearHistory as clearStoredHistory } from '../utils/storage';

export function useBmiHistory() {
  const [history, setHistory] = useState(() => getHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addEntry = (bmi) => {
    const date = formatDate(new Date());
    setHistory((prev) => {
      const isSameDay = prev.length > 0 && prev[prev.length - 1].date === date;
      const entry = { date, bmi };
      return isSameDay ? [...prev.slice(0, -1), entry] : [...prev, entry];
    });
  };

  const clearHistory = () => {
    setHistory([]);
    clearStoredHistory();
  };

  return { history, addEntry, clearHistory };
}
