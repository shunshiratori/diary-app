import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Diary } from "./components/diary";

function App() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "diary-app-89c24.firebaseapp.com",
    projectId: "diary-app-89c24",
    storageBucket: "diary-app-89c24.firebasestorage.app",
    messagingSenderId: "372711367790",
    appId: "1:372711367790:web:fad837c11947ba7bcef27f",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return <Diary db={db} />;
}

export default App;
