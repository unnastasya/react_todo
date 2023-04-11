import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./RegistrationPage.css";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { AuthActions, IsAuthUserSelector } from "../../store/auth";

export function RegistrationPage() {
	const dispatch = useAppDispatch();
	const isAuthUser = useAppSelector(IsAuthUserSelector);

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
		const value = { ...data };
		dispatch(AuthActions.changeRegisterData(value));
		dispatch(AuthActions.registerUser());
	};

	if (isAuthUser) {
		return <Navigate to="/tasks" />;
	}

	return (
		<div className="registrationPage">
			<p className="registrationPage__title">Зарегистрироваться</p>
			<form
				className="registrationPage__form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="E-mail"
								isInvalid={Boolean(errors.email?.message)}
								{...field}
							></Form.Control>
							<p className="registrationPage__validationError">
								{errors.email?.message}
							</p>
						</>
					)}
				/>
				<Controller
					name="fullName"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Имя</Form.Label>
							<Form.Control
								type="fullName"
								placeholder="Имя"
								isInvalid={Boolean(errors.fullName?.message)}
								{...field}
							></Form.Control>
							<p className="registrationPage__validationError">
								{errors.fullName?.message}
							</p>
						</>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<>
							<Form.Label>Пароль</Form.Label>
							<Form.Control
								type="password"
								placeholder="Пароль"
								isInvalid={Boolean(errors.password?.message)}
								{...field}
							></Form.Control>
							<p className="registrationPage__validationError">
								{errors.password?.message}
							</p>
						</>
					)}
				/>
				<div className="registrationPage__buttonsBlock">
					<Button type="submit" className="registrationPage__button">
						Зарегистрироваться
					</Button>
					<Link className="registrationPage__button" to="/login">
						<Button variant="link">Войти</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}
