import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const key = "diary";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "diary-app-89c24.firebaseapp.com",
    projectId: "diary-app-89c24",
    storageBucket: "diary-app-89c24.firebasestorage.app",
    messagingSenderId: "372711367790",
    appId: "1:372711367790:web:fad837c11947ba7bcef27f",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const saveContent = async () => {
    if (!window.localStorage) {
      alert("このブラウザはlocalStorageに対応していません");
    } else {
      const now = new Date();
      now.setHours(now.getHours() + 9); // UTC → JST に変換
      const today = now.toISOString().split("T")[0];
      await setDoc(doc(db, "diary", today), {
        title: title,
        content: content,
      });
    }

    setTitle("");
    setContent("");
  };

  const [diarys, setDiarys] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, "diary")).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiarys(data);
    });
  }, []);

  return (
    <>
      <div className="p-15">
        <h1 className="text-center text-5xl text-red-700 font-bold">
          簡単日記アプリ
        </h1>

        {/* 入力欄 */}
        <div className="border rounded-lg border-gray-200 shadow-sm max-w-md mt-12 m-auto p-5">
          <p className="mb-2">タイトル</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="今日のタイトル"
            className="border border-gray-200 rounded-lg mb-5 w-full p-2"
          />
          <p className="mb-2">内容</p>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日の内容"
            className="border border-gray-200 rounded-lg w-full p-2"
          ></textarea>
          <button
            onClick={saveContent}
            className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid mx-auto cursor-pointer"
          >
            保存する
          </button>
        </div>

        {/* 日記一覧 */}
        <div className="container mx-auto mt-12">
          <h2 className="font-bold text-3xl text-center">日記一覧</h2>

          <div className="grid gap-5 mt-5">
            {Object.entries(diarys).map(([key, value]) => (
              <article
                key={key}
                className="w-full max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm"
              >
                <p className="mb-2 text-gray-500">{value.id}</p>
                <p className="mb-4 font-bold text-xl">{value.title}</p>
                <p>{value.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
