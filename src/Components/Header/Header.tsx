

export default function Header() {
  return (
    <>
      <nav>
        <ul>
          {localStorage.getItem("token") && (
            <li>
              <a href="/cookbook/create">Ny oppskrift</a>
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
              <a href="/cookbook/login">Logg inn</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
