import { Firestore } from "firebase/firestore";
import { saveContent } from "../logic/savaContent";
import { deleteContent } from "../logic/deleteContent";
import { DiaryProps } from "./Diary";

type Props = {
  db: Firestore;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  diarys: DiaryProps[];
  editingId: string | null;
  setEditingId: (isEditing: string | null) => void;
};

export const Contents = (props: Props) => {
  const {
    db,
    title,
    setTitle,
    content,
    setContent,
    diarys,
    editingId,
    setEditingId,
  } = props;

  return (
    <div className="container mx-auto mt-12">
      <h2 className="font-bold text-3xl text-center">日記一覧</h2>

      <div className="grid gap-5 mt-5">
        {diarys.map((item) => (
          <article
            key={item.id}
            className="w-full max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm"
          >
            {editingId !== item.id ? (
              <>
                <p className="mb-2 text-gray-500">{item.id}</p>
                <p className="mb-4 font-bold text-xl">{item.title}</p>
                <p>{item.content}</p>
                <div className="flex gap-3">
                  <button
                    className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer text-sm"
                    onClick={() => {
                      setEditingId(item.id);
                      setTitle(item.title);
                      setContent(item.content);
                    }}
                  >
                    編集する
                  </button>
                  <button
                    className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer text-sm"
                    onClick={() => deleteContent({ db, id: item.id })}
                  >
                    削除する
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="update-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="タイトル"
                  className="border border-gray-200 rounded-lg mb-5 w-full p-2"
                />
                <textarea
                  name="update-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="内容"
                  className="border border-gray-200 rounded-lg w-full p-2"
                ></textarea>
                <div className="flex items-center justify-start mt-4 gap-3">
                  <button
                    className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer text-sm"
                    onClick={() => {
                      saveContent({
                        db,
                        title,
                        setTitle,
                        content,
                        setContent,
                        editingId,
                        setEditingId,
                      });
                    }}
                  >
                    更新する
                  </button>
                  <button
                    className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer text-sm"
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                      setContent("");
                    }}
                  >
                    キャンセル
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
