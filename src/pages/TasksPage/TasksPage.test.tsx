import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { store } from "../../store";
import { setupServer } from "msw/node";
import { TasksPage } from "./TasksPage";
import { tasks } from "../../testData/TasksPage.json";

const server = setupServer(
	rest.get("http://localhost:3000//tasks?authorId=1", (reg, res, ctx) => {
		const data = tasks;
		return res(ctx.json(data));
	})
);

beforeAll(() => {
	server.listen();
});

describe("Tasks page", () => {
	it("renders with data", async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<TasksPage></TasksPage>
				</BrowserRouter>
			</Provider>
		);
		await screen.findAllByTestId("tasks-block");

		expect(screen.getByTestId("task__1")).toHaveTextContent("go to shop");

		expect(screen.getByTestId("task__2")).toHaveTextContent(
			"walk with dog"
		);
	});
});
