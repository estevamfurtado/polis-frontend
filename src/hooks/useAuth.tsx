import { useEffect, useState } from "react"
import * as api from "../services/reqs"
import useToken from "./useToken";
import {
    Person, UserInfo,
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
            getUserData, clearAuth, logIn
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
            if (!wasInitiated) {setWasInitiated(true)}
            setError(error);
            setIsLoading(false);
        }
    }

    function clearAuth() {
        setToken(null);
        setUser(null);
    }

    async function logIn(username: string | null, password: string | null) {

        setError(null);
        setIsLoading(true);
        try {
            const res = await api.signIn({username, password});
            setToken(res.token);
            setUser(res.user);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);
            return res;
        } catch (error) {
            clearAuth();
            setError(error);
            setIsLoading(false);
            if (!wasInitiated) {setWasInitiated(true)}
            return null
        }
    }

}


export const initialAuth : ReturnType<typeof useAuth> = {
    status: {isLoading: false, error: null, wasInitiated: false},
    data: {user: null, token: null},
    actions: {
        getUserData: async ()=>{},
        clearAuth: async ()=>{},
        logIn: async (username: string | null, password: string | null)=>{return null},
    }
}