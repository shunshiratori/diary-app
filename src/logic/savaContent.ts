import {
  collection,
  doc,
  getDocs,
  setDoc,
  orderBy,
  query,
  Firestore,
} from "firebase/firestore";

type Props = {
  db: Firestore;
  key: string;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  isEditingId?: string | null;
  setIsEditingId?: (isEditing: string | null) => void;
};

export const saveContent = async (props: Props) => {
  const {
    db,
    key,
    title,
    setTitle,
    content,
    setContent,
    isEditingId,
    setIsEditingId,
  } = props;
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

  if (hasPostedToday && isEditingId === null) {
    alert("今日はすでに投稿済みです。");
    return;
  } else {
    const today = new Date().toISOString().split("T")[0];
    await setDoc(doc(db, key, today), {
      title: title,
      content: content,
      createdAt: new Date(),
    });
  }
  if (isEditingId && setIsEditingId) {
    setIsEditingId(null);
  }

  setTitle("");
  setContent("");
};
