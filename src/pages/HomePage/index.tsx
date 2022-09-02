import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Album from "../AlbumPage";
import SignIn from "../SignInPage";



export default function About() {

    const {authData: {data:{user}}} = useContext(AuthContext);

    return (
        user ? <Album/> : <SignIn/>
    )

}