// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { envs } from "../enviroments/enviroments.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: envs.FIREBASE_APIKEY,
    projectId: envs.FIREBASE_PROYECT_ID,
    storageBucket: envs.FIREBASE_STORAGE_BUCKET,
    appId: envs.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const utilsFireBase = {
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
};
