import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../axios/axios';
import './RecipeDetails.css';

class RecipeDetails extends React.Component {
	state = {
		recipe: null,
		loading: false
	};

	async componentDidMount() {
		try {
			this.setState({loading: true});
			const result = await axios.get(
				`lookup.php?i=${this.props.match.params.id}`
			);
			const meal = result.data.meals[0];
			const recipeIngredients = [];
			for (let i = 1; i <= 20; i++) {
				if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== '') {
					recipeIngredients.push({
						ingredient: meal[`strIngredient${i}`],
						quantity: meal[`strMeasure${i}`]
					});
				}
			}
			const recipe = {
				id: meal.idMeal,
				recipeName: meal.strMeal,
				category: meal.strCategory,
				img: meal.strMealThumb,
				tags: meal.strTags ? meal.strTags.split(',') : [],
				instructions: meal.strInstructions,
				video: meal.strYoutube.replace('watch?v=', 'embed/'),
				ingredients: recipeIngredients,
				origin: meal.strArea
			};
			this.setState({recipe, loading: false});
		} catch (err) {
			console.log(err);
		}
	}

	goBack = () => {
		this.props.history.goBack();
	};

	renderRecipeDetails = () => {
		if (this.state.loading) {
			return <h2>Loading recipe...</h2>;
		}
		if (this.state.recipe) {
			return (
				<React.Fragment>
					<div className="RecipeDetailsImgContainer">
						<img
							src={this.state.recipe.img}
							alt={this.state.recipe.recipeName}
							className="RecipeDetailsImage"
						/>
						<p className="BackButton" onClick={this.goBack}>
							{'<< '}Back
						</p>
					</div>
					<div className="RecipeInformation">
						<h2 className="RecipeTitle">{this.state.recipe.recipeName}</h2>
						<div className="RecipeCategory">
							<h3>Category:</h3>{' '}
							<Link to={`/recipes/category/${this.state.recipe.category}`}>
								{this.state.recipe.category}
							</Link>
						</div>
						<div className="RecipeOrigin">
							<h3>Origin:</h3>{' '}
							<Link to={`/recipes/origin/${this.state.recipe.origin}`}>
								{this.state.recipe.origin}
							</Link>
						</div>
						<h3 className="SubHeading">Ingredients</h3>
						<table className="IngredientsTable">
							<thead>
								<tr>
									<th>Ingredient</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>
								{this.state.recipe.ingredients.map(ingredient => (
									<tr key={ingredient.ingredient}>
										<td>{ingredient.ingredient}</td>
										<td>{ingredient.quantity}</td>
									</tr>
								))}
							</tbody>
						</table>
						<h3 className="SubHeading">Instructions</h3>
						<p className="RecipeInstructions">
							{this.state.recipe.instructions}
						</p>
						<h3 className="SubHeading">Tutorial</h3>
						<iframe
							className="RecipeTutorial"
							title={this.state.recipe.recipeName}
							src={this.state.recipe.video}
							frameBorder="0"
						/>
						<div className="RecipeTags">
							<h3>Tags:</h3>
							{this.state.recipe.tags.map(tag => (
								<span key={tag} className="Tag">
									{tag}
								</span>
							))}
						</div>
						<p className="BackButton" onClick={this.goBack}>
							{'<< '}Back
						</p>
					</div>
				</React.Fragment>
			);
		}
		return <h2>Recipe not found.</h2>;
	};

	render() {
		return <div className="RecipeDetails">{this.renderRecipeDetails()}</div>;
	}
}

export default RecipeDetails;
