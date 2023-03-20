import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import users from "../../data/users.json";

import "./LoginPage.css"

export function LoginPage() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		console.log(users);
	};
	return (
		<div className="LoginPage">
			<form className="form_login" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Email"
								{...field}
							></Form.Control>
						</>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								{...field}
							></Form.Control>
						</>
					)}
				/>
				<Button type="submit">Отправить</Button>
			</form>
		</div>
	);
}
