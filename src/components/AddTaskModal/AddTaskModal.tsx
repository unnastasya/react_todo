import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { isOpenAddTaskModalSelector, TasksActions } from "../../store/tasks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { categoriesArraySelector } from "../../store/categories";
import { CategoryType } from "../../types/CategoryType";
import { FormInput } from "../Form/FormInput/FormInput";
import { TaskType } from "../../types/TaskType";
import { FormSelect } from "../Form/FormSelect/FormSelect";


export function AddTaskModal() {
	const dispatch = useAppDispatch();
	const userId = window.localStorage.getItem("userId");
	const categories: CategoryType[] = useAppSelector(categoriesArraySelector);
	const isOpenModal: boolean = useAppSelector(isOpenAddTaskModalSelector);

    const TaskSchema = Yup.object().shape({
		task: Yup.string().required("Пожалуйста, введите задачу"),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskType>({
		defaultValues: {
			task: "",
			description: "",
			category: "",
			dateTo: "",
		},
		resolver: yupResolver(TaskSchema),
	});

	const onSubmit = (data: any) => {
		data = {
			...data,
			createdAt: new Date(),
			status: "undone",
			isActiveTask: true,
			authorId: Number(userId),
		};
		dispatch(TasksActions.changeAddData(data));
		dispatch(TasksActions.addTask());
		reset();
		closeAddTaskModal();
	};

    const closeAddTaskModal = () => {
		dispatch(TasksActions.closeAddTaskModal());
	};

	return (
		<Modal show={isOpenModal} onHide={closeAddTaskModal}>
			<Modal.Header closeButton>
				<Modal.Title>Новая задача</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<FormInput
						control={control}
						hasError={Boolean(errors.task?.message)}
						id="task"
						label="Задача"
						type="text"
						placeholder="Задача"
					/>
					<FormInput
						control={control}
						hasError={Boolean(errors.description?.message)}
						id="description"
						label="Описание задачи"
						type="text"
						placeholder="Описание задачи"
					/>
					<FormSelect
						control={control}
						name="category"
						label="Описание задачи"
						options={categories}
					/>
					<FormInput
						control={control}
						hasError={Boolean(errors.dateTo?.message)}
						id="dateTo"
						label="Дата"
						type="date"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeAddTaskModal}>
						Отмена
					</Button>
					<Button type="submit" variant="primary">
						Добавить
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}
