import Header from "../components/_header"
import "../../public/css/style.css"
import { useState } from "react"
import LoginForm from "./login-page"

export const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false)

    const handleLoginClick = () => {
        setShowLogin(true)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    return(
        <div>
            <Header 
            title="Trackify"
            label_button1="Login"
            label_button2="Registrar"
            onClickBtn1={handleLoginClick}
            />

            <LoginForm show={showLogin} onClose={handleCloseLogin}/>
        </div>
    )
}