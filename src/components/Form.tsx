import { Firestore } from "firebase/firestore";
import { saveContent } from "../logic/savaContent";

type Props = {
  db: Firestore;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  setIsForm?: (isForm: boolean) => void;
  editingId: string | null;
  setEditingId: (isEditing: string | null) => void;
};

export const Form = (props: Props) => {
  const {
    db,
    title,
    setTitle,
    content,
    setContent,
    setIsForm,
    editingId,
    setEditingId,
  } = props;

  return (
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
      <div className="flex gap-5 justify-center">
        <button
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
            if (setIsForm) {
              setIsForm(false);
            }
          }}
          className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer"
        >
          保存する
        </button>
        <button
          className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid cursor-pointer"
          onClick={() => {
            if (setIsForm) {
              setIsForm(false);
            }
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
