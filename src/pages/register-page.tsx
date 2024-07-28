import React, { useState, useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Checkbox from "../components/_checkBox";
import Button from "../components/_button";
import getAddressByCep from "../util/get-addres-by-cep";
import "../../public/css/style.css";

interface RegisterFormProps {
    show: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ show, onSuccess, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const allAddressInputsFilled = addressInputs.every(input => input.readOnly || input.value?.trim() !== '');
            setIsFormValid(allAddressInputsFilled);
        };

        validateForm();
    }, [cep, street, neighborhood, city, state, showPassword]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClose();

        setTimeout(() => {
            onSuccess();
        }, 500);
    };

    const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked);
    };

    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cepValue = event.target.value;
        setCep(cepValue);

        if (cepValue.length === 8) {
            getAddressByCep(cepValue, setStreet, setNeighborhood, setCity, setState, setError);
        } else {
            setStreet('');
            setNeighborhood('');
            setCity('');
            setState('');
        }
    };

    const personalInputs = [
        { type: "text", placeholder: "Nome" },
        { type: "text", placeholder: "Sobrenome" },
        { type: "email", placeholder: "Email" },
        { type: showPassword ? "text" : "password", placeholder: "Password" },
        { type: showPassword ? "text" : "password", placeholder: "Confirm Password" },
    ];

    const addressInputs = [
        { type: "text", placeholder: "Cep", value: cep, onChange: handleCepChange },
        { type: "text", placeholder: "Endereço", value: street, readOnly: true },
        { type: "text", placeholder: "Número", value: '' },
        { type: "text", placeholder: "Bairro", value: neighborhood, readOnly: true },
        { type: "text", placeholder: "Cidade", value: city, readOnly: true },
        { type: "text", placeholder: "Estado", value: state, readOnly: true },
    ];

    const registerButtons = [
        { type: "submit" as const, className: "btn btn-primary", label: "Register", onClick: handleSubmit },
    ];

    const registerCheckboxes = [
        { id: "showPassword", label: "Show Password", checked: showPassword, onChange: handleCheckPassword },
    ];

    return (
        <Modal show={show} onHide={onClose} dialogClassName="custom-modal-width">
            <div className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        {personalInputs.map((input, index) => (
                            <Col md={6} key={index}>
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    className="form-control mb-2"
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mb-3">
                        {addressInputs.map((input, index) => (
                            <Col md={6} key={index}>
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    onChange={input.onChange || (() => {})}
                                    readOnly={input.readOnly || false}
                                    className="form-control mb-2"
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-3">
                        <Col md={12} className="d-flex justify-content-around">
                            {registerCheckboxes.map((checkbox, index) => (
                                <div key={index} className="checkbox-container">
                                    <Checkbox
                                        id={checkbox.id}
                                        label={checkbox.label}
                                        checked={checkbox.checked}
                                        onChange={checkbox.onChange}
                                    />
                                    <label className="checkbox-label" htmlFor={checkbox.id}>{checkbox.label}</label>
                                </div>
                            ))}
                            <Button
                                type={registerButtons[0].type}
                                className={registerButtons[0].className}
                                label={registerButtons[0].label}
                                onClick={registerButtons[0].onClick}
                                disabled={!isFormValid} // Desabilita o botão se o formulário não for válido
                            />
                        </Col>
                    </Row>
                    {error && <p className="text-danger">{error}</p>}
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default RegisterForm;
