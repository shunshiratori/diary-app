import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Diary } from "./components/Diary";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
export const auth = getAuth(app);

function App() {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>
          <Diary db={db} />;
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}

export default App;
