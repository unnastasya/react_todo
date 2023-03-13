import React from "react";
import { Button } from "react-bootstrap";

export function DoneButton({ id, status }: any) {
	
	return (
		<Button variant="outline-primary">
			{status ? "Готово" : "Отменить"}
		</Button>
	);
}
