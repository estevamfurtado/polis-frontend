import {useEffect, useState} from "react";

export default function useToken() : [string | null, (input: string | null) => void] {

  const key = "polis_token";
  const [token, setTokenState] = useState<string | null>(localStorage.getItem(key));

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
