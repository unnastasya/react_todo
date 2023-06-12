import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { categories } from "../../testData/TasksPage.json";
import { CategoriesBlock } from "./CategoriesBlock";
import * as redux from "react-redux";

jest.mock("react-redux");

const mockedDisptch = jest.spyOn(redux, "useDispatch");

describe("CategoriesBlock component", () => {
	it("renders with data", async () => {
		jest.spyOn(redux, "useSelector").mockReturnValue(categories);
		render(
			<BrowserRouter>
				<CategoriesBlock></CategoriesBlock>
			</BrowserRouter>
		);
		await screen.findAllByTestId("categoriesBlock");

		expect(screen.getByTestId("category__work")).toHaveTextContent("work");

		expect(screen.getByTestId("category__home")).toHaveTextContent("home");
	});

	it("delete category", async () => {
		jest.spyOn(redux, "useSelector").mockReturnValue(categories);
		const dispatch = jest.fn();
		mockedDisptch.mockReturnValue(dispatch);
		render(
			<BrowserRouter>
				<CategoriesBlock></CategoriesBlock>
			</BrowserRouter>
		);
		await screen.findAllByTestId("categoriesBlock");

		expect(screen.getByTestId("category__work")).toHaveTextContent("work");

		expect(screen.getByTestId("category__home")).toHaveTextContent("home");

		fireEvent.click(screen.getByTestId("category__work__deleteButton"));

		await expect(dispatch).toBeCalledTimes(2); // 1 -> changeDeleteData, 2 -> deleteCategory
	});

	it("delete active category", async () => {
		jest.spyOn(redux, "useSelector").mockReturnValue(categories);
		const dispatch = jest.fn();
		mockedDisptch.mockReturnValue(dispatch);
		render(
			<BrowserRouter>
				<CategoriesBlock></CategoriesBlock>
			</BrowserRouter>
		);
		await screen.findAllByTestId("categoriesBlock");

		expect(screen.getByTestId("category__work")).toHaveTextContent("work");

		expect(screen.getByTestId("category__home")).toHaveTextContent("home");

		fireEvent.click(screen.getByTestId("category__work"));

		fireEvent.click(screen.getByTestId("category__work__deleteButton"));

		await expect(dispatch).toBeCalledTimes(4); // 1-> changeCategory("work") 2 -> changeDeleteData, 3 -> deleteCategory, 4 -> changeCategory("все")
	});
});
