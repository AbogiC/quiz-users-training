import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmMH0qLRjH_TJoTM-8U0gZ00jZHiizWLI",
    authDomain: "quiz-project-3a88f.firebaseapp.com",
    projectId: "quiz-project-3a88f",
    storageBucket: "quiz-project-3a88f.appspot.com",
    messagingSenderId: "1003612470085",
    appId: "1:1003612470085:web:cdf270d4f35c7987e5dc2c",
    measurementId: "G-JWSR9Y95CZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);