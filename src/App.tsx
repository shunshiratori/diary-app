import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const key = "diary";

  const saveContent = () => {
    if (!window.localStorage) {
      alert("このブラウザはlocalStorageに対応していません");
    } else {
      const diaryData = JSON.parse(localStorage.getItem(key) || "{}");
      // const today = new Date().toISOString().split("T")[0];
      const today = new Date().toISOString();
      diaryData[today] = {
        title: title,
        content: content,
      };
      localStorage.setItem(key, JSON.stringify(diaryData));
    }

    setTitle("");
    setContent("");
  };

  const diarys = JSON.parse(localStorage.getItem(key) || "{}");
  console.log(diarys);

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
                <p className="mb-2 text-gray-500">{key}</p>
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
