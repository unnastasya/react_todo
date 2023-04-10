import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
	return (
		<div className="homePage">
			<div className="homePage__buttonsBlock">
				<Link to="/login">
					<Button className="homePage__button" variant="primary">Войти</Button>
				</Link>
				<Link to="/register">
					<Button className="homePage__button" variant="outline-primary">
						Зарегистрироваться
					</Button>
				</Link>
			</div>
		</div>
	);
}
