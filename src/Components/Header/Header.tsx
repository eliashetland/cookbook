

export default function Header() {
  return (
    <>
      <nav>
        <ul>
          {localStorage.getItem("token") && (
            <li>
              <a href="/create">Ny oppskrift</a>
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
              <a href="/login">Logg inn</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
