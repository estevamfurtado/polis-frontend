import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AlbumContext, Mode } from "../../../contexts/AlbumContext";



export default function Sections () {

    console.log('rendering sections')

    const {setMode} = useContext(AlbumContext)    

    useEffect(()=>{
        setMode(Mode.pagesSection)
    })

    return <Outlet/>
} 