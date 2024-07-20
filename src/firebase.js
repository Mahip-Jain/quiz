// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDKVV8QNCGJGcLsPuToFsiDNAUZaFLlpXk",
	authDomain: "quiz-app-db9b4.firebaseapp.com",
	projectId: "quiz-app-db9b4",
	storageBucket: "quiz-app-db9b4.appspot.com",
	messagingSenderId: "1018079036295",
	appId: "1:1018079036295:web:2ecc4c82e89465b4aa8922",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
