import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useTitle = (title:string) => {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current || 'Recipe Book' ;
    };
  }, [title]);
};

export const useProtectedRoute = (isAllowed: boolean, redirect?: string) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAllowed) return;
    navigate(redirect ? redirect : '/')
  }, [isAllowed, redirect, navigate])
}
