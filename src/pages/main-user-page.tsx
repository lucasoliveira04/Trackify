import { useEffect } from "react";
import generateToken from "../util/generate-token";
import { verific_token } from "../util/storage-validator";

export const MainUserPage = () => { 

    useEffect(() => {
        generateToken("login")
        verific_token()
    }, [])

    
    return (
        <div>
         
        </div>
    );
};
