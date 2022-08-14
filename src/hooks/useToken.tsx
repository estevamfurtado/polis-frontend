import {useEffect, useState} from "react";

export default function useToken() : [string | null, (input: string | null) => void] {

  const [token, setTokenState] = useState<string | null>(null)
  const key = "polis_token";

  useEffect(() => {
    const token = localStorage.getItem(key);
    if (token) {
      setTokenState(token);
    }
  }, []);

  function setToken(input: string | null) {
    if (input) {
      localStorage.setItem(key, input);
    }
    else {
      localStorage.removeItem(key);
    }
    setTokenState(input);
  }

  return [token, setToken];
}
