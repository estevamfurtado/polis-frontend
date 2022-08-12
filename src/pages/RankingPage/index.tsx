import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";

import { RankingProvider } from "../../contexts/RankingContext";
import RankingGrid from "./Grid";

export default function RankingPage() {

    const {data: {completeRanking}, hooks: {getRankingData}} = useContext(DataContext);
    const isLoaded = completeRanking ? true : false;

    useEffect(() => {
        if (!isLoaded){
            getRankingData();
        }
    }, [])
    
    return isLoaded ? (
        <RankingProvider>
            <RankingGrid/>
        </RankingProvider>
    ) : <>Não carregou</>

}