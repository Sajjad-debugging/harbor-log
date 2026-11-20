import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="panel narrow">
      <h1>Page not found</h1>
      <p>There is nothing at this address. <Link to="/">Return home</Link></p>
    </section>
  );
}
