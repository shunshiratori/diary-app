import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const key = "diary";

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

  const [diarys, setDiarys] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, key), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiarys(data);
    };

    fetchData();
  }, [db]);

  const saveContent = async () => {
    const now = new Date();
    now.setHours(now.getHours() + 9); // JSTに変換
    const todayStr = now.toISOString().slice(0, 10);

    // Firestoreの全投稿を取得して今日の投稿があるかチェック
    const q = query(collection(db, key), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const hasPostedToday = snapshot.docs.some((doc) => {
      const data = doc.data();
      if (!data.createdAt) return false;

      const createdAt = new Date(data.createdAt.seconds * 1000);
      createdAt.setHours(createdAt.getHours() + 9);
      const entryStr = createdAt.toISOString().slice(0, 10);

      return entryStr === todayStr;
    });

    if (hasPostedToday) {
      alert("今日はすでに投稿済みです。");
      return;
    }

    await setDoc(doc(db, key), {
      title: title,
      content: content,
      createdAt: new Date(),
    });

    setTitle("");
    setContent("");
  };

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
            {diarys.map((item) => (
              <article
                key={item.id}
                className="w-full max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm"
              >
                <p className="mb-2 text-gray-500">{item.id}</p>
                <p className="mb-4 font-bold text-xl">{item.title}</p>
                <p>{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
