import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { CategoriesActions } from "../../store/categories";
import { AddCategoryType } from "../../types/CategoryType";
import * as Yup from "yup";

import "./AddCategoryBlock.css";

export function AddCategoryBlock() {
	const dispatch = useAppDispatch();
	const authorId: number = Number(window.localStorage.getItem("userId"));

	let CategorySchema = Yup.object().shape({
		text: Yup.string().required("Пожалуйста, добавьте категорию"),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddCategoryType>({
		defaultValues: {
			text: "",
		},
		resolver: yupResolver(CategorySchema),
	});

	const onSubmit = (data: any) => {
		data = {
			...data,
			authorId: Number(authorId),
		};
		dispatch(CategoriesActions.changeAddData(data));
		dispatch(CategoriesActions.addCategory());
		reset();
	};

	return (
		<form className="addCategoryBlock" onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="text"
				control={control}
				render={({ field }) => (
					<>
						<Form.Control
							type="text"
							className="addCategoryBlock__input"
							placeholder="Категория"
							isInvalid={Boolean(errors.text?.message)}
							{...field}
						></Form.Control>
					</>
				)}
			/>
			<Button
				type="submit"
				className="addCategoryBlock__button"
				variant="primary"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-plus-lg"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
					/>
				</svg>
			</Button>
		</form>
	);
}
