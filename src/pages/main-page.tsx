import Header from "../components/_header"
import "../../public/css/style.css"
import { useEffect, useState } from "react"
import LoginForm from "./login-page"

export const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLoginSuccess = () => [
        setIsLoggedIn(true)
    ]

    const handleLoginClick = () => {
        setShowLogin(true)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    useEffect(() => {
        if (isLoggedIn){
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
            />

            <LoginForm show={showLogin} onSuccess={handleLoginSuccess} onClose={handleCloseLogin}/>
        </div>
    )
}