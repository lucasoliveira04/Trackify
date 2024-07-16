import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    className: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, className, label, onClick }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;
