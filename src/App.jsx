import React ,{ useEffect, useState } from 'react'
import './App.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";


function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [chartArray, setChartArray] = useState([{date:'04/12/24', bmi:bmi}]);
  const WEIGHT_OPTIONS = [{value: 10,label: '10',},{value: 50,label: '50',},{value: 80,label: '80',},{value: 110,label: '110',},{value: 140,label: '140'}];
  const HEIGHT_OPTIONS = [{value: 50,label: '50',},{value: 100,label: '100',},{value: 150,label: '150',},{value: 200,label: '200'}];


  const chosenWeight = (e, newValue)=>{//updates weight value by KG
    setWeight(newValue)
  }
  const chosenHeight = (e, newValue)=>{//updates height value by CM
    setHeight(newValue/100)
  }

  const calculate = () =>{
    const value = (weight/(height*height)).toFixed(2); // the bmi value
    const today = new Date(); // today date
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    const date = `${day}/${month}/${year}`; // today by dd/mm/yy
    const newItem = {date:date, bmi:value}
    setChartArray([...chartArray, newItem]) // save the information to show it on chart
    setBmi(value);
  }

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div className='warpper'>
      <div className='bmi-calculator'>
      <h1 className='title'>BMI CALAULATOR</h1>
      <div className='chosen-weight'>
        <p>my weight (KG)</p>
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={0}
            getAriaValueText={valuetext}
            onChange={chosenWeight}
            step={1}
            valueLabelDisplay="auto"
            marks={WEIGHT_OPTIONS}
            max={150}
          />
        </Box>
      </div>
      <div className='chosen-height'>
        <p>my height (CM)</p>
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={40}
            getAriaValueText={valuetext}
            onChange={chosenHeight}
            step={1}
            valueLabelDisplay="auto"
            marks={HEIGHT_OPTIONS}
            min={40}
            max={240}
          />
        </Box>
      </div>
      <button className='bmi-button' onClick={calculate}>calculate my BMI</button>
      <p className='bmi-result'>Your BMI is <span className='the-bmi'>{bmi}</span></p>
      </div>
      
      <LineChart width={350} height={300} data={chartArray}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="bmi" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default App
