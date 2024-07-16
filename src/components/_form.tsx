import React from "react";
import Input from "./_input";
import Button from "./_button";
import Checkbox from "./_checkBox";

interface DynamicFormProps {
    inputs: {
        type: string;
        placeholder?: string;
        value?: string | number;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }[];
    buttons: {
        type: "button" | "submit" | "reset";
        className: string;
        label: string;
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }[];
    checkboxes: {
        id: string;
        label: string;
        checked: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ inputs, buttons, checkboxes }) => {
    return (
        <form>
            {inputs.map((input, index) => (
                <Input
                    key={index}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={input.onChange}
                />
            ))}
            {checkboxes.map((checkbox, index) => (
                <Checkbox
                    key={index}
                    id={checkbox.id}
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={checkbox.onChange}
                />
            ))}
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    type={button.type}
                    className={button.className}
                    label={button.label}
                    onClick={button.onClick}
                />
            ))}
        </form>
    );
}

export default DynamicForm;
