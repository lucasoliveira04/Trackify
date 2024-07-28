import { useEffect, useState } from "react";
import getUserData from "../util/getUserData";
import Button from "../components/_button";
import { Row } from "react-bootstrap";
import { useAuth } from "../context/google/auth/GoogleAuthContext";
import { getUserTokenFromSessionStorage } from "../util/auth/token-login-active";

const WIDTH_DEFAULT = 200;
const HEIGHT_DEFAULT = 50;  

interface ButtonConfig {
    type: "button" | "submit" | "reset";
    className: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    width: number;
    height: number;
}

export const MainUserPage = () => { 
    const [, setUserData] = useState<{name: string | null, email: string | null}>({name: null, email: null});
    const { user, logout } = useAuth();
    const [, setToken] = useState<string | null>(null);

    const fetchData = async () => {
        const data = await getUserData();
        if (data) {
            setUserData(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const fetchedToken = getUserTokenFromSessionStorage();
            setToken(fetchedToken);

            if (!fetchedToken) {
                window.location.href = "/";
            }
        };

        checkAuth();
    }, [user]);

    const current = Math.floor(Math.random() * 100) + 1;

    const handleOpenPeoplesRegister = () => {
        console.log("Open");
    }

    const peoplesRegister = () => {
        console.log("Open");
    }

    const buttons: ButtonConfig[] = [
        {type: "button", className: "btn btn-success", label: "Cadastre pessoa AQUI", onClick: handleOpenPeoplesRegister, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT},
        {type: "button", className: "btn btn-primary", label: `Pessoas cadastradas ${current}`, onClick: peoplesRegister, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT},
        {type: "button", className: "btn btn-danger", label: "Logout", onClick: logout, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT}
    ];


    return (
        <div>
            <Row className="d-flex justify-content-center gap-5 mt-2">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        type={button.type}
                        className={button.className}
                        label={button.label}
                        onClick={button.onClick}
                        width={button.width}
                        height={button.height}
                    />
                ))}
            </Row>
        </div>
    );
};
