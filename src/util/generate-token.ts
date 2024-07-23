import { customAlphabet } from 'nanoid';
import moment from 'moment-timezone';


const generateToken = (typeToken: string): void => {
    switch (typeToken) {
        case "login":
            const token = generateRandomToken(26);
            const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss.SSS-03:00'); // Formato com fuso horário

            const tokenData = {
                token,
                timestamp
            };

            localStorage.setItem(`t_${typeToken}`, JSON.stringify(tokenData)); // Corrigido para `t_${typeToken}`
            console.log(`Token de ${typeToken} gerado às ${timestamp}: ${token}`);
            break;
        default:
            console.log("Tipo de token desconhecido");
            break;
    }
};

const generateRandomToken = (length: number): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
};


export default generateToken;
