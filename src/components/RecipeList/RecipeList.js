import React from 'react';
import axios from '../../axios/axios';
import SearchForm from '../SearchForm/SearchForm';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeList.css';

class RecipeList extends React.Component {
	state = {
		recipes: [],
		searchTerm: '',
		loading: false
	};

	async componentDidMount() {
		try {
			this.setState({loading: true});
			let url = 'latest.php';
			const lastSearchTerm = localStorage.getItem('recipeSearchTerm');
			if (lastSearchTerm) {
				url = `search.php?s=${lastSearchTerm}`;
				this.setState({searchTerm: lastSearchTerm});
			}
			const result = await axios.get(url);
			const recipes = result.data.meals.map(meal => {
				return {
					id: meal.idMeal,
					recipeName: meal.strMeal,
					category: meal.strCategory,
					img: meal.strMealThumb,
					tags: meal.strTags ? meal.strTags.split(',') : []
				};
			});
			this.setState({recipes: recipes, loading: false});
		} catch (err) {
			console.log(err);
		}
	}

	onSearchTermChange = e => {
		this.setState({searchTerm: e.target.value});
	};

	onSearchSubmit = async e => {
		e.preventDefault();
		try {
			this.setState({loading: true});
			localStorage.setItem('recipeSearchTerm', this.state.searchTerm);
			const result = await axios.get(`search.php?s=${this.state.searchTerm}`);
			const recipes = result.data.meals.map(meal => {
				return {
					id: meal.idMeal,
					recipeName: meal.strMeal,
					category: meal.strCategory,
					img: meal.strMealThumb,
					tags: meal.strTags ? meal.strTags.split(',') : []
				};
			});
			this.setState({recipes: recipes, loading: false});
		} catch (err) {
			console.log(err);
		}
	};

	renderRecipes = () => {
		if (this.state.loading) {
			return <h2>Loading recipes...</h2>;
		}
		if (this.state.recipes.length > 0) {
			return this.state.recipes.map(recipe => (
				<RecipeCard
					key={recipe.id}
					recipeName={recipe.recipeName}
					id={recipe.id}
					img={recipe.img}
					category={recipe.category}
					tags={recipe.tags}
				/>
			));
		}
		return <h2>No recipes found.</h2>;
	};

	render() {
		return (
			<div>
				<SearchForm
					onSubmit={this.onSearchSubmit}
					value={this.state.searchTerm}
					onChange={this.onSearchTermChange}
				/>
				<div className="Recipes">{this.renderRecipes()}</div>
			</div>
		);
	}
}

export default RecipeList;