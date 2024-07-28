import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    className: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: number
    height?: number
}

const Button: React.FC<ButtonProps> = ({ type, className, label, onClick, width, height }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width: `${width}px`, height: `${height}px`
            }}
        >
            {label}
        </button>
    );
}

export default Button;
