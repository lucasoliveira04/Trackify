import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Checkbox from "../components/_checkBox";
import googleImg from "../../public/img/google.png";
import Button from "../components/_button";
interface LoginFormProps {
    show: boolean;
    onSuccess: () => void
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ show, onSuccess, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClose();

        setTimeout(() => {
            onSuccess()
        }, 500)
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked);
    };

    const loginInputs = [
        { type: "text", placeholder: "Username" },
        { type: showPassword ? "text" : "password", placeholder: "Password" },
    ];

    const loginButtons = [
        { type: "submit" as const, className: "btn-primary", label: "Login", onClick: handleSubmit },
    ];

    const loginCheckboxes = [
        { id: "showPassword", label: "Show Password", checked: showPassword, onChange: handleCheckboxChange },
    ];

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center fw-bold">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {loginInputs.map((input, index) => (
                        <Row key={index} md={6}>
                            <input
                                type={input.type}
                                placeholder={input.placeholder}
                                className="form-control mb-2"
                            />
                        </Row>
                    ))}
                    <Col md={12} className="d-flex justify-content-around">
                        {loginCheckboxes.map((checkbox, index) => (
                            <Checkbox
                                key={index}
                                id={checkbox.id}
                                label={checkbox.label}
                                checked={checkbox.checked}
                                onChange={checkbox.onChange}
                            />
                        ))}
                        <Button
                            type={loginButtons[0].type}
                            className={loginButtons[0].className}
                            label={loginButtons[0].label}
                            onClick={loginButtons[0].onClick}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <img src={googleImg} width={"50px"} style={{ cursor: "pointer" }} />
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default LoginForm;
