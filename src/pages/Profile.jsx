import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <section className="panel">
      <h1>This is Profile Page</h1>

      <dl className="facts">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>User ID</dt>
          <dd className="mono">{user.uid}</dd>
        </div>
      </dl>

      <button type="button" className="danger" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}
