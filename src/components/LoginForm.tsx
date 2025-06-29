import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../App";

export const LoginForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  console.log("LoginForm");

  return (
    <div className="p-15">
      <h1 className="text-center text-5xl text-red-700 font-bold">
        簡単日記アプリ
      </h1>
      <div className="max-w-sm mx-auto p-5 border rounded-lg mt-10">
        <h2 className="text-2xl mb-4">
          {mode === "login" ? "ログイン" : "新規登録"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {mode === "login" ? "ログイン" : "登録"}
          </button>
        </form>
        <p
          className="mt-2 text-center text-sm text-blue-600 cursor-pointer"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "新規登録はこちら" : "ログインはこちら"}
        </p>
      </div>
    </div>
  );
};
