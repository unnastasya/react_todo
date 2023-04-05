import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { findUser } from "../../api/auth";

export function LoginPage() {
	const [errorsData, setErrorsData] = useState<any[]>();
	const [loginErrorsData, setLoginErrorsData] = useState<string[]>([]);
    const navigate = useNavigate();

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
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(LoginSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: any) => {
		const resodata = await findUser(data).then( (response) => response);
		if (resodata.length === 0) {
			setLoginErrorsData(["Пользователь не найден"]);
            return;
		} else {
			setLoginErrorsData([]);
		}
        if (resodata[0].password !== data.password) {
            setLoginErrorsData(["Неверный логин или пароль"]);
            return;
        } else {
            setLoginErrorsData([]);
        }
        navigate(`/tasks`)
		console.log(resodata);
	};

	

	

	useEffect(() => {
		setErrorsData(Object.values(errors));
	}, [errors]);
	return (
		<div className="LoginPage">
            <p className="login_title">Войти</p>
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
								isInvalid={Boolean(errors.email?.message)}
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
				{!(loginErrorsData.length === 0) && (
					<div className="registration_errors">
						{loginErrorsData?.map((error) => (
							<p className="register_text">{error}</p>
						))}
					</div>
				)}
                <div className="buttons_block">
				<Button className="button" type="submit">Войти</Button>
                <Link className="button" to="/register">
					<Button variant="link">Зарегистрироваться</Button>
				</Link>
                </div>
			</form>
		</div>
	);
}
