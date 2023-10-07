import React, { useState, useEffect } from "react";
import "./App.css";
import debounce from "lodash.debounce";

function App() {
  const [user, setUser] = useState();
  const [githubUser, setGithubUser] = useState({
    username: "",
    name: "",
    followers: 0,
  });

  const InputWithDebouncedOnchange = () => {
    const onChange = (e) => {
      console.log("Changed value:", e.target.value);
      setUser(e.target.value);
    };

    const debouncedOnChange = debounce(onChange, 1000);

    return <input onChange={debouncedOnChange} />;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://api.github.com/users/${user}`);
      const data = await res.json();
      setGithubUser({
        user: data.login,
        fullname: data.name,
        followers: data.followers,
      });
    };
    fetchUser();
  }, [user]);
  return (
    <>
      <h1>Debounced input</h1>
      <InputWithDebouncedOnchange />
      <h1>{githubUser.user}</h1>
      <h1>{githubUser.fullname}</h1>
      <h1>{githubUser.followers}</h1>
    </>
  );
}

export default App;
