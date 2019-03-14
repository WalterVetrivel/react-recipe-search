import React from 'react';
import RecipeListItem from './RecipeListItem/RecipeListItem';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import './FilteredRecipes.css';

class RecipeByCategory extends React.Component {
	state = {
		recipes: [],
		loading: false
	};

	async componentDidMount() {
		const filterType = this.props.match.url.split('/')[2];
		let filter;
		let url;
		if (filterType === 'origin') {
			filter = this.props.match.params.origin;
			url = `filter.php?a=${filter}`;
		} else if (filterType === 'category') {
			filter = this.props.match.params.category;
			url = `filter.php?c=${filter}`;
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
			this.setState({recipes: recipes, loading: false});
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
				<p className="BackButton" onClick={this.goBack}>
					{'<< '}Back
				</p>
				<Link className="HomeButton" to="/recipes">
					Home
				</Link>
				<h2 className="Heading">
					Search results for:{' '}
					<em>
						{this.props.match.params.category
							? this.props.match.params.category
							: this.props.match.params.origin}
					</em>
				</h2>
				{this.renderRecipes()}
				<p className="BackButton" onClick={this.goBack}>
					{'<< '}Back
				</p>
				<Link className="HomeButton" to="/recipes">
					Home
				</Link>
			</div>
		);
	}
}

export default RecipeByCategory;
