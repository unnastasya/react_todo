import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { AuthActions } from "../../store/auth";

import "./UserInfo.css";

export function UserInfo() {
	const dispatch = useAppDispatch();
	const author = window.localStorage.getItem("userName");

	const logout = () => {
		dispatch(AuthActions.logout());
	};

	return (
		<div className="UserInfo">
			<div className="userInfo__nameBlock">
				<p className="userInfo__name">{author}</p>
			</div>
			<Link to="/">
				<Button className="userInfo__logoutButton" onClick={logout}>
					Выйти
				</Button>
			</Link>
		</div>
	);
}
