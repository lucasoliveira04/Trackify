import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Checkbox from "../components/_checkBox";
import Button from "../components/_button";

interface RegisterFormProps {
    show: boolean;
    onSuccess: () => void
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ show, onSuccess, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onClose()

        setTimeout(() => {
            onSuccess()
        }, 500)
    }

    const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked)
    }

    const registerInputs = [
        { type: "text", placeholder: "Username" },
        { type: "email", placeholder: "Email" },
        { type: showPassword ? "text" : "password", placeholder: "Password" },
        { type: showPassword ? "text" : "password", placeholder: "Confirm Password" },
    ];

    const registerButtons = [
        { type: "submit" as const, className: "btn-primary", label: "Register", onClick: handleSubmit },
    ];

    const registerCheckboxes = [
        { id: "showPassword", label: "Show Password", checked: showPassword, onChange: handleCheckPassword },
    ];
    
    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center fw-bold">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {registerInputs.map((input, index) => (
                        <Row key={index} md={6}>
                            <input
                                type={input.type}
                                placeholder={input.placeholder}
                                className="form-control mb-2"
                            />
                        </Row>
                    ))}
                    <Col md={12} className="d-flex justify-content-around">
                        {registerCheckboxes.map((checkbox, index) => (
                            <Checkbox
                                key={index}
                                id={checkbox.id}
                                label={checkbox.label}
                                checked={checkbox.checked}
                                onChange={checkbox.onChange}
                            />
                        ))}
                        <Button
                            type={registerButtons[0].type}
                            className={registerButtons[0].className}
                            label={registerButtons[0].label}
                            onClick={registerButtons[0].onClick}
                        />
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default RegisterForm