import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeByCategory from './components/RecipeByCategory/RecipeByCategory';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route
						path="/recipes/category/:category"
						component={RecipeByCategory}
					/>
					<Route path="/recipes/:id" component={RecipeDetails} />
					<Route path="/recipes" component={RecipeList} />
					<Redirect from="/" to="/recipes" />
				</Switch>
			</div>
		);
	}
}

export default App;
