import { useRouteError } from "react-router-dom";
import { SVG } from "../assets/SvgElements";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message: string };
  return (
    <div className="error-page grid center w-full">
      <h1 className="text-6xl text-center pt-10">Oops!</h1>
      <p className="text-2xl text-center pt-5">
        {" "}
        There no food here, someone spilled the tea.
      </p>
      <code className="text-center">{error.statusText || error.message}</code>
      <SVG title="emailSVG" />
    </div>
  );
}
