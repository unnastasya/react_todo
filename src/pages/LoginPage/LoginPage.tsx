import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./LoginPage.css";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	ErrorMessageDataSelector,
	IsAuthUserSelector,
} from "../../store/auth";
import { UserLoginType } from "../../types/UserType";

export function LoginPage() {
	const dispatch = useAppDispatch();
	const loginErrorsData = useAppSelector(ErrorMessageDataSelector);
	const isAuthUser = useAppSelector(IsAuthUserSelector);

	let LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email("Пожалуйста, введите корректный email")
			.required("Пожалуйста, введите email"),
		password: Yup.string().required("Пожалуйста, введите пароль"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(LoginSchema),
		mode: "onChange",
	});

	const onSubmit = (data: UserLoginType) => {
		const value = { ...data };
		dispatch(AuthActions.changeLoginData(value));
		dispatch(AuthActions.requestLogin());
	};

	if (isAuthUser) {
		return <Navigate to="/tasks" />;
	}

	return (
		<div className="loginPage">
			<p className="loginPage__title">Войти</p>
			<form className="loginPage__form" onSubmit={handleSubmit(onSubmit)}>
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
							<p className="loginPage__validationError">
								{errors.email?.message}
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
							<p className="validationError">
								{errors.password?.message}
							</p>
						</>
					)}
				/>
				{loginErrorsData && (
					<Alert variant="danger">
						<p>{loginErrorsData}</p>
					</Alert>
				)}
				<div className="loginPage__buttonsBlock">
					<Button className="loginPage__button" type="submit">
						Войти
					</Button>
					<Link className="loginPage__button" to="/register">
						<Button variant="link">Зарегистрироваться</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}
