import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function MeasurementInput({ label, unit, value, onChange, min, max, step = 1, marks, error }) {
  const handleSliderChange = (_e, newValue) => {
    onChange(String(newValue));
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="measurement-input">
      <div className="measurement-input__header">
        <label htmlFor={label}>
          {label} <span className="measurement-input__unit">({unit})</span>
        </label>
        <input
          id={label}
          className={`measurement-input__number ${error ? 'measurement-input__number--error' : ''}`}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
        />
      </div>
      <Box sx={{ width: '100%', px: 1 }}>
        <Slider
          aria-label={label}
          value={Number(value) || min}
          onChange={handleSliderChange}
          step={step}
          valueLabelDisplay="auto"
          marks={marks}
          min={min}
          max={max}
        />
      </Box>
      {error && <p className="measurement-input__error">{error}</p>}
    </div>
  );
}

export default MeasurementInput;
