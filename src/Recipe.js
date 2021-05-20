import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients, url}) => {
    return(
        <div className = {style.recipe}>
            <h1>
            <a href= {url} target='_blank' rel='noopener noreferer'>{title}</a>
            </h1>
            <img src ={image} alt=""/>
            <div className = {style.calories}>
                <b>Calories: </b>{calories}
            </div>
            <ol className = {style.ingredients}>
                {ingredients.map(ing=>(
                    <li>{ing.text}</li>
                ))}
            </ol>
            
        </div>
    )
}

export default Recipe;