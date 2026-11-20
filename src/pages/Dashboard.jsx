import { useAuth } from "../context/AuthContext.jsx";

const formatTime = (value) => (value ? new Date(value).toLocaleString() : "—");

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="panel">
      <h1>Welcome to Dashboard</h1>
      <p className="lead">This is Dashboard Page. Only logged-in users can see it.</p>

      <dl className="facts">
        <div>
          <dt>Signed in as</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Account created</dt>
          <dd>{formatTime(user.metadata.creationTime)}</dd>
        </div>
        <div>
          <dt>Last sign-in</dt>
          <dd>{formatTime(user.metadata.lastSignInTime)}</dd>
        </div>
      </dl>
    </section>
  );
}
