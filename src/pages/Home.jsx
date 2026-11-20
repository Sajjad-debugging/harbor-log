import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="panel">
      <h1>Welcome to Home Page</h1>
      <p className="lead">
        Harbor Log is a small React + Firebase demo. Anyone can see this page.
        The Dashboard and Profile pages are kept behind a login.
      </p>

      {user ? (
        <p>
          You are signed in as <strong>{user.email}</strong>.{" "}
          <Link to="/dashboard">Go to your dashboard</Link>
        </p>
      ) : (
        <p>
          New here? <Link to="/register">Create an account</Link> or{" "}
          <Link to="/login">log in</Link>.
        </p>
      )}
    </section>
  );
}
