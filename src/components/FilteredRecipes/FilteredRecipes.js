import React from 'react';
import RecipeListItem from './RecipeListItem/RecipeListItem';
import {Link} from 'react-router-dom';
import axios from '../../axios/axios';
import './FilteredRecipes.css';

class RecipeByCategory extends React.Component {
	state = {
		recipes: [],
		loading: false,
		resultsCount: 0
	};

	async componentDidMount() {
		const filterType = this.props.match.url.split('/')[2];
		let filter = this.props.match.params.filter;
		let url;
		if (filterType === 'origin') {
			url = `filter.php?a=${filter}`;
		} else if (filterType === 'category') {
			url = `filter.php?c=${filter}`;
		} else if (filterType === 'ingredient') {
			url = `filter.php?i=${filter}`;
		}
		try {
			this.setState({loading: true});
			const result = await axios.get(url);
			const recipes = result.data.meals.map(meal => {
				return {
					id: meal.idMeal,
					recipeName: meal.strMeal,
					img: meal.strMealThumb
				};
			});
			this.setState({
				recipes: recipes,
				loading: false,
				resultsCount: recipes.length
			});
		} catch (err) {
			console.log(err);
		}
	}

	goBack = () => {
		this.props.history.goBack();
	};

	renderRecipes = () => {
		if (this.state.loading) {
			return <h2>Loading recipes...</h2>;
		}
		if (this.state.recipes.length > 0) {
			return this.state.recipes.map(recipe => (
				<RecipeListItem
					key={recipe.id}
					id={recipe.id}
					recipeName={recipe.recipeName}
					img={recipe.img}
				/>
			));
		}
		return <h2>No recipes found.</h2>;
	};

	render() {
		return (
			<div className="RecipesByCategory">
				<p className="BackButton Link" onClick={this.goBack}>
					{'<< '}Back
				</p>
				<Link className="HomeButton Link" to="/recipes">
					Home
				</Link>
				<h2 className="Heading">
					Search results for: <em>{this.props.match.params.filter}</em>
				</h2>
				<h3 className="SubHeading">{this.state.resultsCount} recipes found.</h3>
				{this.renderRecipes()}
				<p className="BackButton Link" onClick={this.goBack}>
					{'<< '}Back
				</p>
				<Link className="HomeButton Link" to="/recipes">
					Home
				</Link>
			</div>
		);
	}
}

export default RecipeByCategory;
