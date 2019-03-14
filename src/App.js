import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import FilteredRecipes from './components/FilteredRecipes/FilteredRecipes';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route
						path="/recipes/category/:category"
						component={FilteredRecipes}
					/>
					<Route
						path="/recipes/origin/:origin"
						component={FilteredRecipes}
					/>
					<Route path="/recipes/:id" component={RecipeDetails} />
					<Route path="/recipes" component={RecipeList} />
					<Redirect from="/" to="/recipes" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default App;
