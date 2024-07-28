import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    className: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width?: number
    height?: number
    disabled?:boolean
    
}

const Button: React.FC<ButtonProps> = ({ type, className, label, onClick, width, height, disabled }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width: `${width}px`, height: `${height}px`
            }}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
