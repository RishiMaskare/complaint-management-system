import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          Smart Campus CMS
        </NavLink>

        <div className="nav-links">
          {!user && (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </>
          )}

          {user?.role === "student" && (
            <NavLink to="/student" className="nav-link">
              Student Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className="nav-link">
              Admin Dashboard
            </NavLink>
          )}
        </div>

        <div className="nav-user">
          {user ? (
            <>
              <span className="welcome-text">Hi, {user.name}</span>
              <button className="btn btn-ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <span className="welcome-text">Campus Support Portal</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
