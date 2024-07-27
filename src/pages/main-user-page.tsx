import { useEffect, useState } from "react";
import generateToken from "../util/generate-token";
import { verific_token } from "../util/storage-validator";
import getUserData from "../util/getUserData";

export const MainUserPage = () => { 
    const [userData, setUserData] = useState<{name: string | null, email: string | null}>({name: null, email: null});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchData = async () => {
        const data = await getUserData()
        if (data) {
            setUserData(data)
            setIsLoggedIn(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            generateToken("login")
            verific_token()
        }
    }, [isLoggedIn])
    
    return (
        <div>
            <h1>Bem vindo, {userData.name || 'Loading...'}</h1>
        </div>
    );
};
