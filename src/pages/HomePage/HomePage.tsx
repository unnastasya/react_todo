import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
	return (
		<div className="homePage">
			<div className="homePage_buttons">
				<Link to="/login">
					<Button variant="outline-secondary">Войти</Button>
				</Link>
				<Link to="/register">
					<Button variant="outline-secondary">
						Зарегистрироваться
					</Button>
				</Link>
			</div>
		</div>
	);
}
