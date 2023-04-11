import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	changeTaskDataSelector,
	isOpenChangeTaskModalSelector,
	TasksActions,
} from "../../store/tasks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { CategoryType } from "../../types/CategoryType";
import { patchTask } from "../../api/tasks";
import { FormSelect } from "../Form/FormSelect/FormSelect";
import { categoriesArraySelector } from "../../store/categories";
import { TaskType } from "../../types/TaskType";
import { FormInput } from "../Form/FormInput/FormInput";

export function ChangeTaskModal() {
	const dispatch = useAppDispatch();
	const categories: CategoryType[] = useAppSelector(categoriesArraySelector);
	const isOpenModal = useAppSelector(isOpenChangeTaskModalSelector);
	const task = useAppSelector(changeTaskDataSelector);

	const TaskSchema = Yup.object().shape({
		task: Yup.string().required("Пожалуйста, введите задачу"),
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TaskType>({
		defaultValues: {
			task: "",
			description: "",
			category: "",
			dateTo: "",
			status: "undone",
		},
		resolver: yupResolver(TaskSchema),
	});

	const onSubmit = (data: any) => {
		patchTask(task.id, data);
		dispatch(TasksActions.requestTasks());
		closeChangeTaskModal();
	};

	const closeChangeTaskModal = () => {
		dispatch(TasksActions.closeChangeTaskModal());
	};

	useEffect(() => {
		setValue("task", task.task);
		setValue("description", task.description);
		setValue("category", task.category);
		setValue("dateTo", task.dateTo);
	}, [task, setValue]);


	return (
		<div>
			<Modal show={isOpenModal} onHide={closeChangeTaskModal}>
				<Modal.Header closeButton>
					<Modal.Title>Редактировать задачу</Modal.Title>
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
						<Button
							variant="secondary"
							onClick={closeChangeTaskModal}
						>
							Отмена
						</Button>
						<Button type="submit" variant="primary">
							Обновить
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
}
