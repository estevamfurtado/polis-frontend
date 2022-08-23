import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { DataContext } from "../../contexts/DataContext"
import About from "../HomePage"


export default function Wall () {
    
    const {auth: {user}} = useContext(DataContext)
    
    return user ? <Outlet/> : <About/>
}