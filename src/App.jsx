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
  if (value === '') return 'Please enter weight';
  const num = Number(value);
  if (Number.isNaN(num)) return 'Weight must be a number';
  if (num < WEIGHT_LIMITS.min || num > WEIGHT_LIMITS.max) {
    return `Weight must be between ${WEIGHT_LIMITS.min} and ${WEIGHT_LIMITS.max} kg`;
  }
  return null;
}

function validateHeight(value) {
  if (value === '') return 'Please enter height';
  const num = Number(value);
  if (Number.isNaN(num)) return 'Height must be a number';
  if (num < HEIGHT_LIMITS.min || num > HEIGHT_LIMITS.max) {
    return `Height must be between ${HEIGHT_LIMITS.min} and ${HEIGHT_LIMITS.max} cm`;
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
        <h1 className="title">BMI Calculator</h1>

        <MeasurementInput
          label="Weight"
          unit={'kg'}
          value={weight}
          onChange={setWeight}
          min={WEIGHT_LIMITS.min}
          max={WEIGHT_LIMITS.max}
          marks={WEIGHT_MARKS}
          error={weightError}
        />

        <MeasurementInput
          label="Height"
          unit={'cm'}
          value={height}
          onChange={setHeight}
          min={HEIGHT_LIMITS.min}
          max={HEIGHT_LIMITS.max}
          marks={HEIGHT_MARKS}
          error={heightError}
        />

        <button className="bmi-button" onClick={calculate} disabled={!isValid}>
          Calculate BMI
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
