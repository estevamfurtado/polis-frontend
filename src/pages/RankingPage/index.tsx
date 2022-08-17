import { Skeleton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

import { RankingProvider } from "../../contexts/RankingContext";
import RankingGrid from "./Grid";

export default function RankingPage() {

    const {content: {rankings}} = useContext(DataContext);
    
    if (!rankings) {
        return <></>
    }
    
    return (
        <RankingProvider>
            <RankingGrid/>
        </RankingProvider>
    )

}

