import Header from "../components/_header"
import "../../public/css/style.css"
import { useEffect, useState } from "react"
import LoginForm from "./login-page"
import RegisterForm from "./register-page"

export const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const [showRegister, setShowRegister] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isRegisterIn, setIsRegisterIn] = useState(false)

    const handleLoginSuccess = () => {
        setIsLoggedIn(true)
    }

    const handleLoginClick = () => {
        setShowLogin(true)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    const handleRegisterSuccess = () => {
        setIsRegisterIn(true)
    }

    const handleRegisterClick = () => {
        setShowRegister(true)
    }

    const handleCloseRegister = () => {
        setShowRegister(false)
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
                onClickBtn1={handleLoginClick}
                onClickBtn2={handleRegisterClick}
            />

            <LoginForm show={showLogin} onSuccess={handleLoginSuccess} onClose={handleCloseLogin}/>
            <RegisterForm show={showRegister} onSuccess={handleRegisterSuccess} onClose={handleCloseRegister}/>
        </div>
    )
}