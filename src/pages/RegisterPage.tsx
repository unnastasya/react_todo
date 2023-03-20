import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function RegisterPage() {
	return (
		<div>
			Register
			<Link to="/tasks">
				<Button variant="outline-secondary">go</Button>
			</Link>
		</div>
	);
}
