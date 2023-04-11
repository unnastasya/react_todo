import React from "react";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form";
import { Form } from "react-bootstrap";
import { TaskType } from "../../../types/TaskType";
import { UserLoginType } from "../../../types/UserType";

interface FormInputProps {
	control: Control<TaskType>;
	type: "text" | "email" | "date";
	label: string;
	id: string;
	placeholder?: string;
	hasError?: boolean;
	errorMessage?: string
}

export function FormInput({
	control,
	hasError,
	errorMessage,
	id,
	label,
	type,
	placeholder
}: FormInputProps) {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field }) => (
				<>
					<Form.Label>{label}</Form.Label>
					<Form.Control
                    
						type={type}
                        
						placeholder={placeholder}
						isInvalid={hasError}
						{...field}
					></Form.Control>
					<p className="validationError">{errorMessage}</p>
				</>
			)}
		/>
	);
}
