import { useNavigate, useRouteError } from "react-router-dom";
import { SVG } from "../assets/SvgElements";
import { useState, useEffect } from "react";
const COUNT_DOWN_LENGTH = 7;
export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message: string };
  const navigate = useNavigate();
  const [countDown, setCountdown] = useState<number>(COUNT_DOWN_LENGTH);
  useEffect(() => {
    if (countDown === 0) {
      navigate("/", { replace: false });
      return;
    }
    const t = setTimeout(() => {
      setCountdown((n) => n - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [countDown]);

  return (
    <div className="error-page grid center w-full">
      <h1 className="text-6xl text-center pt-10">Oops!</h1>
      <p className="text-2xl text-center pt-5">
        {" "}
        There no food here, someone spilled the tea. We'll get you back to
        safety. In
      </p>
      <h2 className="text-9xl text-center transparent">{countDown}</h2>
      <code className="text-center">{error.statusText || error.message}</code>
      <SVG title="search-icon" className="animate-bounce" />
    </div>
  );
}
