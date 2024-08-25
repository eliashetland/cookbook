import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Header() {
  const authUser = useAuthUser<{ name: string }>();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const logOut = () => {
    localStorage.removeItem("token");
    signOut();
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link to="/">Elias Kokebok</Link>
          </li>
          <li className={styles.loggedInItems}>
            {isAuthenticated && (
              <ul>
                <li>
                  <Link to="/create">
                    <i className="fa fa-plus"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={logOut}>
                    <i className="fa fa-right-from-bracket"></i>
                  </Link>
                </li>
                <li>
                {authUser?.name}
                </li>
              </ul>
            )}
          </li>
          {!isAuthenticated && (
            <li>
              <Link to="/login">Logg inn</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
