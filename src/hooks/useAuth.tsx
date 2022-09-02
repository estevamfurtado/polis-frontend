import { useEffect, useState } from "react"
import * as api from "../services/reqs"
import useToken from "./useToken";
import {
    Person,
} from "../types"


export default function useAuth(immediate = true) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wasInitiated, setWasInitiated] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const [token, setToken] = useToken();
    const [user, setUser] = useState<Person | null>(null)

    useEffect(()=>{
        if (immediate) getUserData();
    }, [])

    return {
        status: {isLoading, error, wasInitiated},
        data: {token, user,},
        actions: {
            getUserData, clearAuth, setToken
        }
    }

    async function getUserData() {
        setError(null);
        setIsLoading(true);

        try {
            const res = await api.getUser();
            setUser(res);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);

        } catch (error) {
            clearAuth();
            setError(error);
            setIsLoading(false);
        }
    }

    function clearAuth() {
        setToken(null);
        setUser(null);
    }

}