import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { API } from "../../API/API";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleLogin = async (e: any) => {
    setError("");
    e.preventDefault();

    if (!username) return setError("Du må ha brukernavn");
    if (!password) return setError("Du må ha passord");

    const res = await API.post("api/entry/login", { username, password });
    try {
      console.log("res");
      
      if (!res) return setError("Det oppsto en feil, prøv igjen senere");
      if (!res.data.isOk) return setError("Feil brukernavn eller passord");
      if (!res.data.token) return setError("Feil brukernavn eller passord");
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";


    }catch (error) {
      setError("Det oppstod en feil, prøv igjen senere");
    } 


  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginDiv}>
          <h1 className={styles.loginHeader}>Logg inn</h1>
          <form className={styles.loginForm}>
            <label className={styles.loginLabel} htmlFor="brukernavn">
              Brukernavn
            </label>
            <input
              autoFocus
              className={styles.loginInput}
              type="text"
              placeholder="Brukernavn"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className={styles.loginLabel} htmlFor="passord">
              Passord
            </label>
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Passord"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              className={styles.submitBtn}
              data-testid="submit-test"
              value="Logg inn"
              onClick={handleLogin}
            />
          </form>
          {error && <div className={styles.error}>{error}</div>}


        </div>
      </div>
    </>
  );
}

