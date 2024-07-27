import Header from "../components/_header"
import "../../public/css/style.css"
import React, { useEffect, useState } from "react"
import LoginForm from "./login-page"
import RegisterForm from "./register-page"

type ModalStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [ ,setIsRegisterIn] = useState(false)

    const handleOpenModal = (setModalState: ModalStateSetter) => {
        setModalState(true)
    }

    const handleCloseModal = (setModalState: ModalStateSetter) => {
        setModalState(false)
    }

    const handleSuccess = (setSuccessState: ModalStateSetter) => {
        setSuccessState(true)
    }


    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/home"
        }
    }, [isLoggedIn])

    return(
        <div>
            <Header 
                title="Trackify"
                label_button1="Login"
                label_button2="Registrar"
                onClickBtn1={() => handleOpenModal(setShowLogin)}
                onClickBtn2={() => handleOpenModal(setShowRegister)}
            />

            <LoginForm 
                show={showLogin} 
                onSuccess={() => handleSuccess(setIsLoggedIn)} 
                onClose={() => handleCloseModal(setShowLogin)} />

            <RegisterForm 
                show={showRegister} 
                onSuccess={() => handleSuccess(setIsRegisterIn)} 
                onClose={() => handleCloseModal(setShowRegister)} />
        </div>
    )
}