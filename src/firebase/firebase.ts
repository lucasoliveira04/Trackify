import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDH674L_kvS3F3BTvud_Cov3XU860IvEJI",
    authDomain: "trackify-dc4be.firebaseapp.com",
    projectId: "trackify-dc4be",
    storageBucket: "trackify-dc4be.appspot.com",
    messagingSenderId: "974241619352",
    appId: "1:974241619352:web:bfb734ff47d785161c5fed",
    measurementId: "G-HPR0BZB1MK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export {app, analytics, auth, googleProvider}