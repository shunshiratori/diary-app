import { useEffect, useState } from "react";
import { saveContent } from "../logic/savaContent";
import {
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

type Props = {
  db: Firestore;
};
type Diary = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

export const Diary = ({ db }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const key = "diary";
  const [diarys, setDiarys] = useState<Diary[]>([]);

  useEffect(() => {
    const q = query(collection(db, key), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Diary[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          content: d.content,
          createdAt: d.createdAt.toDate(),
        };
      });
      setDiarys(data);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <div className="p-15">
        <h1 className="text-center text-5xl text-red-700 font-bold">
          簡単日記アプリ
        </h1>
        <p className="text-center text-xl mt-2 text-gray-500">
          毎日の思いを1日1回だけ記録できます。
        </p>

        {/* フォーム */}
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
            onClick={() =>
              saveContent({ db, key, title, setTitle, content, setContent })
            }
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
};
