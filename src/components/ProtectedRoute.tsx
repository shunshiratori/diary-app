import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "./LoginForm";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>ロード中</p>;
  console.log("form");
  if (!user) return <LoginForm />;
  console.log("login");
  return <>{children}</>;
};
