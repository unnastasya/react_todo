import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { TasksActions } from "../../store/tasks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./AddTaskButton.css";
import { Controller, useForm } from "react-hook-form";
import { getCategories } from "../../api/categories";

export function AddTaskButton({ handleClose }: any) {
	const dispatch = useAppDispatch();
	const [allcategories, setallcategories] = useState<any[]>([]);

	let TaskSchema = Yup.object().shape({
		task: Yup.string().required("Пожалуйста, введите задачу"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			task: "",
			description: "",
			category: "",
		},
		resolver: yupResolver(TaskSchema),
	});

	const onSubmit = (data: any) => {
		data = {
			...data,
			createdAt: new Date(),
			status: "undone",
			isActiveTask: true,
			authorId: 1,
		};
		dispatch(TasksActions.changeAddData(data));
		dispatch(TasksActions.addTask());
		handleClose();
	};

	useEffect(() => {
		t();
	}, []);

	const t = async () => {
		let data = await getCategories().then((response: any) => response);
		setallcategories(data);
	};

	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title>Новая задача</Modal.Title>
			</Modal.Header>
			<form className="" onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<Controller
						name="task"
						control={control}
						render={({ field }) => (
							<>
								<Form.Label>Задача</Form.Label>
								<Form.Control
									type="text"
									placeholder="Задача"
									isInvalid={Boolean(errors.task?.message)}
									{...field}
								></Form.Control>
							</>
						)}
					/>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<>
								<Form.Label>Описание задачи</Form.Label>
								<Form.Control
									type="text"
									placeholder="Описание задачи"
									isInvalid={Boolean(
										errors.description?.message
									)}
									{...field}
								></Form.Control>
							</>
						)}
					/>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<>
								<Form.Label>Категория</Form.Label>
								<Form.Select
									className="category"
									aria-label="Default select example"
									{...field}
								>
									{allcategories.map((category) => (
										<option value={category.text}>
											{category.text}
										</option>
									))}
								</Form.Select>
							</>
						)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Отмена
					</Button>
					<Button type="submit" variant="primary">
						Добавить
					</Button>
				</Modal.Footer>
			</form>
		</div>
	);
}
