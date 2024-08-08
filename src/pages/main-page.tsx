import Header from "../components/_header"
import "../../public/css/style.css"
import React, { useEffect, useState } from "react"
import LoginForm from "./login-page"
import RegisterForm from "./register-page"
import { useAuth } from "../context/google/auth/GoogleAuthContext"

type ModalStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [, setIsLoggedIn] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [, setIsRegisterIn] = useState(false)

    const { user } = useAuth()

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
        if (user) {
            window.location.href = "/home"
        }
    }, [user])

    return (
        <div>
            <Header
                title="Trackify"
                label_button1="Login"
                label_button2="Registrar"
                onClickBtn1={() => handleOpenModal(setShowLogin)}
                onClickBtn2={() => handleOpenModal(setShowRegister)}
            />

            <div className="">
                <div style={styles.container}>
                    <h3 style={styles.heading}>Quem somos ?</h3>
                    <p style={{ ...styles.text, fontWeight: "bold", width: "50%" }}>
                        Somos uma startup brasileira, fundada em julho de 2024, dedicada ao monitoramento em tempo real de pessoas idosas. Nosso objetivo é proporcionar segurança e tranquilidade, permitindo que familiares acompanhem o bem-estar de seus entes queridos de maneira simples e eficaz. Com uma plataforma Open-Source, oferecemos um serviço totalmente gratuito, acessível a todos. Junte-se a nós na missão de cuidar daqueles que cuidaram de nós.
                    </p>
                </div>
                <div style={styles.container}>
                    <h3 style={styles.heading}>Nossos Objetivos</h3>
                    <p style={{ ...styles.text, fontWeight: "bold", width: "50%" }}>
                        Nosso principal objetivo é proporcionar uma plataforma de monitoramento em tempo real para pessoas idosas, garantindo segurança e tranquilidade para suas famílias. Como uma plataforma open-source, queremos incentivar a contribuição da comunidade para aprimorar continuamente nossos serviços. Estamos comprometidos em oferecer um serviço totalmente gratuito, acessível a todos, e em fazer a diferença na vida das pessoas.
                    </p>
                </div>
                <div style={styles.container}>
                    <h3 style={styles.heading}>Fundadores</h3>
                    <p style={{ ...styles.text, fontWeight: "bold", width: "50%" }}>
                        Lucas Oliveira Campos
                    </p>
                </div>
                <div style={styles.container}>
                    <h3 style={styles.heading}>Suporte</h3>
                    <p style={{ ...styles.text, fontWeight: "bold", width: "50%" }}>
                        Deixe seu feedback
                    </p>
                </div>
            </div>

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

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3%"
    },
    text: {
        fontFamily: "var(--main-font)",
        textAlign: "justify",
        fontSize: ""
    },
    heading: {
        marginBottom: "1rem"
    }
}