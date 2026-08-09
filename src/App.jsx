import { useState } from 'react';
import './App.css';
import MeasurementInput from './components/MeasurementInput';
import BmiResult from './components/BmiResult';
import BmiChart from './components/BmiChart';
import { useBmiHistory } from './hooks/useBmiHistory';
import { calculateBmi, WEIGHT_LIMITS, HEIGHT_LIMITS } from './utils/bmi';

const WEIGHT_MARKS = [10, 50, 100, 150, 200].map((value) => ({ value, label: String(value) }));
const HEIGHT_MARKS = [50, 100, 150, 200, 250].map((value) => ({ value, label: String(value) }));

function validateWeight(value) {
  if (value === '') return 'נא להזין משקל';
  const num = Number(value);
  if (Number.isNaN(num)) return 'משקל חייב להיות מספר';
  if (num < WEIGHT_LIMITS.min || num > WEIGHT_LIMITS.max) {
    return `משקל חייב להיות בין ${WEIGHT_LIMITS.min} ל-${WEIGHT_LIMITS.max} ק"ג`;
  }
  return null;
}

function validateHeight(value) {
  if (value === '') return 'נא להזין גובה';
  const num = Number(value);
  if (Number.isNaN(num)) return 'גובה חייב להיות מספר';
  if (num < HEIGHT_LIMITS.min || num > HEIGHT_LIMITS.max) {
    return `גובה חייב להיות בין ${HEIGHT_LIMITS.min} ל-${HEIGHT_LIMITS.max} ס"מ`;
  }
  return null;
}

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const { history, addEntry, clearHistory } = useBmiHistory();

  const weightError = weight === '' ? null : validateWeight(weight);
  const heightError = height === '' ? null : validateHeight(height);
  const isValid = validateWeight(weight) === null && validateHeight(height) === null;

  const calculate = () => {
    if (!isValid) return;
    const value = calculateBmi(Number(weight), Number(height));
    setBmi(value);
    addEntry(value);
  };

  return (
    <div className="wrapper">
      <div className="bmi-card">
        <h1 className="title">מחשבון BMI</h1>

        <MeasurementInput
          label="משקל"
          unit={'ק"ג'}
          value={weight}
          onChange={setWeight}
          min={WEIGHT_LIMITS.min}
          max={WEIGHT_LIMITS.max}
          marks={WEIGHT_MARKS}
          error={weightError}
        />

        <MeasurementInput
          label="גובה"
          unit={'ס"מ'}
          value={height}
          onChange={setHeight}
          min={HEIGHT_LIMITS.min}
          max={HEIGHT_LIMITS.max}
          marks={HEIGHT_MARKS}
          error={heightError}
        />

        <button className="bmi-button" onClick={calculate} disabled={!isValid}>
          חשב BMI
        </button>

        <BmiResult bmi={bmi} />
      </div>

      <div className="chart-card">
        <BmiChart history={history} onClear={clearHistory} />
      </div>
    </div>
  );
}

export default App;
