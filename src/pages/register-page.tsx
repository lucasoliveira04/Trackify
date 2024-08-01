import React, { useState, useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Checkbox from "../components/_checkBox";
import Button from "../components/_button";
import handleCepChange from "../util/handle-cep-change";
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
    const [numero, setNumero] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const personalInputs = [
        { type: "text", placeholder: "Nome", value: name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) },
        { type: "text", placeholder: "Sobrenome", value: surname, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value) },
        { type: "email", placeholder: "Email", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { type: showPassword ? "text" : "password", placeholder: "Senha", value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), className: passwordError ? 'is-invalid' : '' },
        { type: showPassword ? "text" : "password", placeholder: "Confirmar Senha", value: confirmPassword, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value), className: passwordError ? 'is-invalid' : '' },
    ];

    const addressInputs = [
        { type: "text", placeholder: "Cep", value: cep, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleCepChange(e, setCep, setStreet, setNeighborhood, setCity, setState, setError) },
        { type: "text", placeholder: "Endereço", value: street, readOnly: true },
        { type: "text", placeholder: "Número", value: numero, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNumero(e.target.value) },
        { type: "text", placeholder: "Bairro", value: neighborhood, readOnly: true },
        { type: "text", placeholder: "Cidade", value: city, readOnly: true },
        { type: "text", placeholder: "Estado", value: state, readOnly: true },
    ];

    useEffect(() => {
        const validateForm = () => {
            const allPersonalInputsFilled = personalInputs.every(input => input.value?.trim() !== '');
            const allAddressInputsFilled = addressInputs.every(input => input.readOnly || input.value?.trim() !== '');
            setIsFormValid(allPersonalInputsFilled && allAddressInputsFilled);
        };

        validateForm();
    }, [name, surname, email, password, confirmPassword, cep, street, neighborhood, city, state, showPassword]);

    useEffect(() => {
        if (confirmPassword.length > 0) {
            setPasswordError(password !== confirmPassword);
        }
    }, [password, confirmPassword]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        onClose();

        setTimeout(() => {
            onSuccess();
        }, 500);
    };

    const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked);
    };

    const registerButtons = [
        { type: "submit" as const, className: "btn btn-primary w-50", label: "Criar Conta", onClick: handleSubmit },
    ];

    const registerCheckboxes = [
        { id: "showPassword", label: "Exbir Senha", checked: showPassword, onChange: handleCheckPassword },
    ];

    return (
        <Modal show={show} onHide={onClose} dialogClassName="custom-modal-width">
            <div className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title text-center w-100">Criar Conta <i className="material-icons">perm_identity</i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        {personalInputs.map((input, index) => (
                            <Col md={6} key={index}>
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    onChange={input.onChange}
                                    className={`form-control mb-2 ${input.className || ''}`}
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
                                    onChange={input.onChange || (() => { })}
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
                                </div>
                            ))}
                            <Button
                                type={registerButtons[0].type}
                                className={registerButtons[0].className}
                                label={registerButtons[0].label}
                                onClick={registerButtons[0].onClick}
                                disabled={!isFormValid}
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
