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
  const [query, setQuery] = useState("vegan");

  const filters = [
    {
      type: "health",
      name: "Gluten Free",
      param: "gluten-free",
      info: "No ingredients containing Gluten",
    },
    {
      type: "health",
      name: "Paleo",
      param: "paleo",
      info: "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils ",
    },
    {
      type: "health",
      name: "Vegan",
      param: "vegan",
      info: "No meat, poultry, fish, dairy, eggs or honey ",
    },
  ];

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    
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
            <DietFilter name={param.name} param={param.param} callback={()=>{
              console.log("hello");
            }} />
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
