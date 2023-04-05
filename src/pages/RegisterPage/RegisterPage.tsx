import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./RegisterPage.css";
import { addUser } from "../../api/auth";
import { Link } from "react-router-dom";

export function RegisterPage() {
	const [errorsData, setErrorsData] = useState<any[]>();

	let SignupSchema = Yup.object().shape({
		email: Yup.string()
			.email("Пожалуйста, введите корректный email")
			.required("Пожалуйста, введите email"),
		fullName: Yup.string().required("Пожалуйста, введите ваше имя"),
		password: Yup.string()
			.min(5, "Длина пароля должна быть больше 5 символов")
			.required("Пожалуйста, введите пароль"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			fullName: "",
			password: "",
		},
		resolver: yupResolver(SignupSchema),
		mode: "onChange",
	});

	const onSubmit = (data: any) => {
		console.log(data);
		addUser(data);
	};

	useEffect(() => {
		setErrorsData(Object.values(errors));
		console.log(errorsData);
	}, [errors, errorsData]);
	return (
		<div className="RegisterPage">
			<p className="register_title">Зарегистрироваться</p>
			<form className="form_register" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Email"
								isInvalid={Boolean(errors.email?.message)}
								{...field}
							></Form.Control>
						</>
					)}
				/>
				<Controller
					name="fullName"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>full name</Form.Label>
							<Form.Control
								type="fullName"
								placeholder="Full Name"
								isInvalid={Boolean(errors.fullName?.message)}
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
								isInvalid={Boolean(errors.password?.message)}
								{...field}
							></Form.Control>
						</>
					)}
				/>
				{!(Object.keys(errors).length === 0) && (
					<div className="registration_errors">
						{errorsData?.map((error) => (
							<p className="register_text">{error.message}</p>
						))}
					</div>
				)}
				<div className="buttons_block">
					<Button type="submit" className="button">Зарегистрироваться</Button>
					<Link className="button" to="/login">
						<Button variant="link">Войти</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}
