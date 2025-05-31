import { deleteDoc, doc, Firestore } from "firebase/firestore";

type Props = {
  db: Firestore;
  key: string;
  id: string;
};
export const deleteContent = async (props: Props) => {
  const { db, key, id } = props;
  await deleteDoc(doc(db, key, id));
};
