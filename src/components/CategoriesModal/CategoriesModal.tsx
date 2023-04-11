import React, { useEffect } from "react";
import { Modal, Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	CategoriesActions,
	categoriesArraySelector,
	isOpenCategoriesModal,
} from "../../store/categories";
import { CategoryType } from "../../types/CategoryType";
import { UserInfo } from "../UserInfo/UserInfo";
import { AddCategoryBlock } from "../AddCategoryBlock/AddCategoryBlock";

import "./CategoriesModal.css";
import { Category } from "../Category/Category";

export function CategoriesModal() {
	const dispatch = useAppDispatch();
	const allcategories: CategoryType[] = useAppSelector(
		categoriesArraySelector
	);
	const isOpenCategory = useAppSelector(isOpenCategoriesModal);

	const closeCategoryModal = () => {
		dispatch(CategoriesActions.closeCategoriesModal());
	};

	return (
		<Offcanvas
			animation={true}
			show={isOpenCategory}
			onHide={closeCategoryModal}
		>
			<Offcanvas.Header
				className="CategoriesModal__header"
				closeButton
			></Offcanvas.Header>
			<Offcanvas.Body className="CategoriesModal__body">
				<UserInfo />
				<AddCategoryBlock />
				{allcategories.map((category: CategoryType) => (
					<Category key={category.id} category={category} />
				))}
			</Offcanvas.Body>
		</Offcanvas>
	);
}
