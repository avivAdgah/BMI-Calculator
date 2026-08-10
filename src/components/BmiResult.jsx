import { getBmiCategory } from '../utils/bmi';

function BmiResult({ bmi }) {
  if (bmi === null) {
    return (
      <div className="bmi-result bmi-result--empty">
        <p>Fill in weight and height to calculate your BMI</p>
      </div>
    );
  }

  const category = getBmiCategory(bmi);

  return (
    <div className="bmi-result" style={{ '--category-color': category.color }}>
      <p className="bmi-result__label">Your BMI</p>
      <p className="bmi-result__value">{bmi.toFixed(1)}</p>
      <span className="bmi-result__pill">{category.label}</span>
    </div>
  );
}

export default BmiResult;
