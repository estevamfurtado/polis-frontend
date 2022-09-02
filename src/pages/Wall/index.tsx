import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import About from "../HomePage"


export default function Wall () {
    
    const {authData} = useContext(AuthContext)
    
    return authData && authData.data.user ? <Outlet/> : <About/>
}