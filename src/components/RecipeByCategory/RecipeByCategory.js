import React from 'react';
import RecipeListItem from './RecipeListItem/RecipeListItem';
import axios from '../../axios/axios';
import './RecipeByCategory.css';

class RecipeByCategory extends React.Component {
	state = {
		recipes: [],
		loading: false
	};

	async componentDidMount() {
		try {
			this.setState({loading: true});
			const category = this.props.match.params.category;
			const url = `filter.php?c=${category}`;
			const result = await axios.get(url);
			const recipes = result.data.meals.map(meal => {
				return {
					id: meal.idMeal,
					recipeName: meal.strMeal,
					img: meal.strMealThumb
				};
			});
			this.setState({recipes: recipes, loading: false});
		} catch (err) {
			console.log(err);
		}
	}

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
				<h2 className="Heading">Search by category: {this.props.match.params.category}</h2>
				{this.renderRecipes()}
			</div>
		);
	}
}

export default RecipeByCategory;
