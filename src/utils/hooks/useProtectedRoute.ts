import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedRoute = (isAllowed: boolean, redirect?: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAllowed) return;
    navigate(redirect ? redirect : "/");
  }, [isAllowed, redirect, navigate]);
};
