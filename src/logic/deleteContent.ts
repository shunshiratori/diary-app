import { deleteDoc, doc, Firestore } from "firebase/firestore";
import { key } from "../components/Diary";

type Props = {
  db: Firestore;
  id: string;
};
export const deleteContent = async (props: Props) => {
  const { db, id } = props;
  await deleteDoc(doc(db, key, id));
};
