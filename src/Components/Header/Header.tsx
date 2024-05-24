import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const logOut = ()=>{
    localStorage.removeItem("token")
    setIsLoggedIn(false);
  }
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link to="/">Elias Kokebok</Link>
          </li>
          <li className={styles.loggedInItems}>
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to="/create"><i className="fa fa-plus"></i></Link>
                </li>
                <li>
                  <Link to="/" onClick={logOut}>
                    <i className="fa fa-right-from-bracket"></i>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Logg inn</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}  
