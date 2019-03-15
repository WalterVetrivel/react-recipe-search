import React from 'react';
import './Footer.css';

const footer = () => (
	<footer className="Footer">
		<p>
			Copyright &copy; Walter Selvakumar {new Date().getFullYear()}. All rights
			reserved.
		</p>
		<p>
			Powered by{' '}
			<a
				href="https://www.themealdb.com/api.php"
				target="_blank"
				rel="noopener noreferrer"
				className="Link">
				TheMealDB
			</a>
			.
		</p>
	</footer>
);

export default footer;
