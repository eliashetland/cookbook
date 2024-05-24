import { Link } from "react-router-dom";


export default function Header() {
  return (
    <>
      <nav>
        <ul>
          {localStorage.getItem("token") && (
            <li>
              <Link to="/create">Ny oppskrift</Link>
            </li>
          )}
          {localStorage.getItem("token") && (
            <li>
              <button onClick={() => localStorage.removeItem("token")}>
                Logg ut
              </button>
            </li>
          )}

          {!localStorage.getItem("token") && (
            <li>
              <Link to="/login">Logg inn</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
