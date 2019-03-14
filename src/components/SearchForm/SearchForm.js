import React from 'react';
import './SearchForm.css';

const searchForm = props => (
	<form onSubmit={props.onSubmit} className="SearchForm">
		<label htmlFor="recipe" className="SearchLabel">
			Search recipes
		</label>
		<input
			type="text"
			id="recipe"
			name="recipe"
			value={props.value}
			onChange={props.onChange}
			className="SearchTerm"
			placeholder="Eg. chicken"
		/>
		<button type="submit" className="SearchButton">
			Search
		</button>
	</form>
);

export default searchForm;
