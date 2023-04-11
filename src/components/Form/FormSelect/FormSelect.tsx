import React from "react";
import { Control, Controller } from "react-hook-form";
import { TaskType } from "../../../types/TaskType";
import { Form } from "react-bootstrap";

interface FormSelectProps {
	control: any;
    name: string,
    label: string,
    options: any[];
}

export function FormSelect({control, name, label, options}: FormSelectProps)  {
    return (
        <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <>
                <Form.Label>{label}</Form.Label>
                <Form.Select
                    className="category"
                    aria-label="Default select example"
                    {...field}
                >
                    {options.map((category) => (
                        <option value={category.text}>
                            {category.text}
                        </option>
                    ))}
                </Form.Select>
            </>
        )}
    />
   )
}