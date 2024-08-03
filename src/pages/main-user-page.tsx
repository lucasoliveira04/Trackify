import { useEffect, useState } from "react";
import getUserData from "../util/getUserData";
import Button from "../components/_button";
import { Row } from "react-bootstrap";
import { useAuth } from "../context/google/auth/GoogleAuthContext";
import { getUserTokenFromSessionStorage } from "../util/auth/token-login-active";
import { createTokenDataChild, decodeToken, TokenPayload } from "../util/user_child/generate-token-track-child";
// import { useGoogleMaps } from "../context/google/map/GoogleMapsContext";
// import MapComponent from "../components/_google-map";
import { cleanAddress } from "../util/geo-location";
import { useLocation } from "../hooks/use-location";
import { formatedDateTime } from "../util/formated-date-time";

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
    const [, setUserData] = useState<{ name: string | null, email: string | null }>({ name: null, email: null });
    const { user, logout } = useAuth();
    const [, setToken] = useState<string | null>(null);
    const [, setTokenAddress] = useState<string | null>(null);
    const [, setDecodedData] = useState<TokenPayload | null>(null);
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<TokenPayload | null>(null);
    const [showExtractToken, setShowExtractToken] = useState<boolean>(false); 
    // const { googleMaps } = useGoogleMaps();
    const { address } = useLocation();

    const fetchData = async () => {
        const data = await getUserData();
        if (data) {
            setUserData(data);
        }
    };

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
    };

    const peoplesRegister = () => {
        console.log("Open");
    };

    const buttons: ButtonConfig[] = [
        { type: "button", className: "btn btn-success", label: "Cadastre pessoa AQUI", onClick: handleOpenPeoplesRegister, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT },
        { type: "button", className: "btn btn-primary", label: `Pessoas cadastradas ${current}`, onClick: peoplesRegister, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT },
        { type: "button", className: "btn btn-danger", label: "Logout", onClick: logout, width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT }
    ];

    useEffect(() => {
        if (address !== null) {
            const newToken = createTokenDataChild({
                id: 123,
                username: "Lucas",
                email: "Teste@gmail.com",
                addressClient: cleanAddress(address),
                role: "child",
                iat: Math.floor(Date.now() / 1000)
            });
            setTokenAddress(newToken);
            const decodedData = decodeToken(newToken);
            setDecodedData(decodedData);

            const concatedAddressAndDateTime = `${address} | ${formatedDateTime()}`;
            localStorage.setItem('address', concatedAddressAndDateTime);

            const storedValue = localStorage.getItem('address');
            const [storedAddress] = storedValue ? storedValue.split(" | ") : [null];

            if (storedAddress !== address) {
                alert("mudou né?");
                localStorage.setItem('address', concatedAddressAndDateTime);
            }
        }
    }, [address]);

    const generateToken = () => {
        const newToken = createTokenDataChild({
            id: 123,
            username: "Lucas",
            email: "Teste@gmail.com",
            addressClient: cleanAddress(address),
            role: "child",
            iat: Math.floor(Date.now() / 1000)
        });

        setGeneratedToken(newToken);
        setShowExtractToken(true); 
    }

    const extractTokenData = () => {
        if (generatedToken) {
            const data = decodeToken(generatedToken);
            setExtractedData(data);
        }
    }

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

            <div>
                <button className="btn btn-success fw-bold" style={{ width: '10%' }} onClick={generateToken}>
                    Gerar Token
                </button>
                
                {generatedToken && (
                    <h1>{generatedToken}</h1>
                )}

                {showExtractToken && (
                    <button className="btn btn-secondary" style={{ width: '10%' }} onClick={extractTokenData}>
                        Extrair Token
                    </button>
                )}
                
                {extractedData && (
                    <div>
                        <h2>Dados do Token:</h2>
                        <p>ID: {extractedData.id}</p>
                        <p>Username: {extractedData.username}</p>
                        <p>Email: {extractedData.email}</p>
                        <p>Role: {extractedData.role}</p>
                        <p>Address: {extractedData.addressClient}</p>
                        <p>Issued At: {new Date(extractedData.iat * 1000).toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
