import React from 'react';
import {Link} from 'react-router-dom';
import './RecipeListItem.css';

const recipeListItem = props => (
	<div className="RecipeListItem">
		<img src={props.img} className="RecipeListImg" alt={props.recipeName} />
		<div className="RecipeListBody">
			<h3 className="RecipeListTitle">{props.recipeName}</h3>
			<div className="RightAlign">
				<Link to={`/recipes/${props.id}`} className="CardLink">
					View Details
				</Link>
			</div>
		</div>
	</div>
);

export default recipeListItem;
