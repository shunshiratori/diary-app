import { useEffect, useState } from "react";
import {
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Form } from "./Form";
import { Contents } from "./Contents";
import { auth } from "../App";
import { signOut } from "firebase/auth";

type Props = {
  db: Firestore;
};

export type DiaryProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

export const key = "diary";

export const Diary = ({ db }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [diarys, setDiarys] = useState<DiaryProps[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, key), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: DiaryProps[] = snapshot.docs.map((doc) => {
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
        <button
          className="mt-4 rounded-lg transition grid mx-auto cursor-pointer"
          onClick={() => {
            signOut(auth);
          }}
        >
          log out
        </button>

        {!isForm ? (
          <>
            <button
              className="mt-4 bg-gray-900 text-white p-4 rounded-lg hover:bg-gray-700 transition grid mx-auto cursor-pointer"
              onClick={() => {
                setIsForm((prev) => !prev);
              }}
            >
              今日の日記を書く
            </button>
            <Contents
              db={db}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              diarys={diarys}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          </>
        ) : (
          <Form
            db={db}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            setIsForm={setIsForm}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
      </div>
    </>
  );
};
