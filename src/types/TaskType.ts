export type TaskType = {
    [index: string]: any;
	id: number;
	task: string;
	description: string;
	category: string;
	status: "done" | "undone" | "overdue";
	isActiveTask: boolean;
	createdAt: string;
    dateTo?: string;
	authorId: number;
};


