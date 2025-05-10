import {
  collection,
  doc,
  getDocs,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";

export const saveContent = async (
  db,
  key,
  title,
  setTitle,
  content,
  setContent
) => {
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

  // if (hasPostedToday) {
  //   alert("今日はすでに投稿済みです。");
  //   return;
  // }

  const today = new Date().toISOString().split("T")[0];
  await setDoc(doc(db, key, today), {
    title: title,
    content: content,
    createdAt: new Date(),
  });

  setTitle("");
  setContent("");
};
