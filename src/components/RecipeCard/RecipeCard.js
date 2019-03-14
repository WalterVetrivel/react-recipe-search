import React from 'react';
import {Link} from 'react-router-dom';
import './RecipeCard.css';

const recipeCard = props => (
	<div className="RecipeCard">
		<img className="CardImg" src={props.img} alt={props.recipeName} />
		<div className="CardBody">
			<h2 className="CardTitle">{props.recipeName}</h2>
			<p className="Category">
				<b>Category: </b>
				{props.category}
			</p>
			<p className="Tags">
				<b>Tags: </b>
				{props.tags.map(tag => (
					<span key={tag} className="Tag">
						{tag}
					</span>
				))}
			</p>
			<Link className="CardLink" to={`/recipes/${props.id}`}>
				View Details
			</Link>
		</div>
	</div>
);

export default recipeCard;
