import React, {useState} from "react";
import "./App.css";


const DietFilter = ({type, name, param, info}) => {
  const [checked, setChecked] = useState(false);

  const isChecked =()=>{
    
    console.log(checked);
  };
  return (
    <div className = 'checkbox'> 
      <label key={param}> {name}</label>
      <input type="checkbox" onClick={isChecked} />
    </div>
  );
};

export default DietFilter;
