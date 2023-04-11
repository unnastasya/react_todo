import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import { patchTask } from "../api/tasks";


export const isOverdueTask = (task: any) => {

    dayjs.extend(isLeapYear);
	dayjs.extend(relativeTime);
    dayjs.locale("ru");

    let data;
	let data1;
	let diffTime;

	if (task.dateTo) {
		data = dayjs(task.createdAt).format("HH:mm DD MMMM YYYY");
		data1 = dayjs(task.dateTo).add(1, "day").fromNow();
		const d = dayjs(task.dateTo).add(1, "day");
		const now = dayjs();
		diffTime = d.diff(now);

		if (diffTime <= 0 && task.status !== "done") {
			patchTask(task.id, { status: "overdue" });
		}
	}

}