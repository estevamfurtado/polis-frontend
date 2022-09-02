import { createContext, PropsWithChildren } from "react"
import useAlbum from "../../hooks/useAlbum"

type ContextValues = {
    albumData: ReturnType<typeof useAlbum>
}

export const AlbumContext = createContext<ContextValues>({
    albumData: useAlbum()
})

export function AlbumProvider ({ children }: PropsWithChildren) {

    const albumData = useAlbum();

    const values : ContextValues = {albumData}

    return <AlbumContext.Provider value={values}>
        {children}
    </AlbumContext.Provider>
}