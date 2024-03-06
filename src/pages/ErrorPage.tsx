import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  useEffect(() => {

  }, [])
  return (
    <div>
      <h1>Oops!</h1>
      <p>Page not found</p>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
}
