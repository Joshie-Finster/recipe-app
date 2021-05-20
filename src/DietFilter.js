import React, { useState } from "react";
import "./App.css";

const DietFilter = (props) => {
  const [checked, setChecked] = useState(props.defaultChecked);

  const isChecked = () => {
    var newCheck = !checked;
    setChecked(newCheck)
    props.callback(newCheck);

  };
  return (
    <div className="checkbox">
      <label key={props.param}> {props.name}</label>
      <input type="checkbox" defaultChecked={props.defaultChecked} onChange={isChecked} />
    </div>
  );
};

export default DietFilter;
