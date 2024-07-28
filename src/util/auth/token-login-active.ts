import {auth} from "../../firebase/firebase"

export const getUserToken = async () => {
    const currentUser = auth.currentUser
    if (currentUser){
        const token = await currentUser.getIdToken()
        console.log(token)
        return token
    } else {
        return null
    }
}

export const getUserTokenFromSessionStorage = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.token;
    }
    return null;
}