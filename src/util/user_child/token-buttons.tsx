import { useState } from "react";
import { createTokenDataChild, decodeToken, TokenPayload } from "./generate-token-track-child";
import { cleanAddress } from "../geo-location";

interface TokenButtonsProps {
    address: string | null;
}

const TokenButtons: React.FC<TokenButtonsProps> = ({ address }) => {
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<TokenPayload | null>(null);
    const [showExtractToken, setShowExtractToken] = useState<boolean>(false);

    const generateToken = () => {
        const newToken = createTokenDataChild({
            id: 123,
            username: "Lucas",
            email: "Teste@gmail.com",
            addressClient: cleanAddress(address || ''),
            role: "child",
            iat: Math.floor(Date.now() / 1000)
        });

        setGeneratedToken(newToken);
        setShowExtractToken(true); 
    }

    const extractTokenData = () => {
        if (generatedToken) {
            const data = decodeToken(generatedToken)
            setExtractedData(data)
        }
    }

    return (
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
    );
}

export default TokenButtons