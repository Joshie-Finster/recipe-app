import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import DietFilter from "./DietFilter";
import "./App.css";
require("dotenv").config();

const App = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("pizza");
  const [checked, setChecked] = useState([]);

  const filters = [
    {
      type: "health",
      name: "Gluten Free",
      param: "gluten-free",
      info: "No ingredients containing Gluten",
      checked: false,
    },
    {
      type: "health",
      name: "Paleo",
      param: "paleo",
      info: "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils ",
      checked: false,
    },
    {
      type: "health",
      name: "Vegan",
      param: "vegan",
      info: "No meat, poultry, fish, dairy, eggs or honey ",
      checked: true,
    },
  ];

  useEffect(() => {  
    var currentChecked = checked;
    filters.map((param) => {
      if (param.checked) {
        currentChecked.push(param.param);
      }
    });
    setChecked(currentChecked);
    getRecipes();
  }, []);

  useEffect(()=>{
    getRecipes();
  },[query])

  useEffect(()=>{
    getRecipes();
  },[checked])

  const getRecipes = async () => {
    var searchString = checked.map((e)=>{
      return "&health="+ e
    }).join("")
    console.log(checked)
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`+ searchString
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`+ searchString)
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <div className="search">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            search
          </button>
        </div>
        <div className="diet-filter">
          {filters.map((param) => (
            <DietFilter
              name={param.name}
              param={param.param}
              defaultChecked={param.checked}
              callback={(isChecked) => {
                var currentChecked = checked;
                if (isChecked) {
                  currentChecked.push(param.param);
                } else {
                  currentChecked = currentChecked.filter(
                    (value) => value !== param.param
                  );
                }

                setChecked(currentChecked);
            

              }}
            />
          ))}
        </div>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            url={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
