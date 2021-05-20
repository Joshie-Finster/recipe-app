import React, { useState } from "react";
import "./App.css";

const DietFilter = ({ type, name, param, info, callback }) => {
  const [checked, setChecked] = useState(false);

  const isChecked = (check) => {
    console.log(check);
    callback();

  };
  return (
    <div className="checkbox">
      <label key={param}> {name}</label>
      <input type="checkbox" onChange={isChecked} />
    </div>
  );
};

export default DietFilter;
