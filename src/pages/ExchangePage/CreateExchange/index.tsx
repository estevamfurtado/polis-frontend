import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Input, Badge} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../contexts/DataContext"
import { MyDeck, CompleteSticker, GetDeckResponse } from "../../../types";
import * as api from "../../../services/reqs";
import Search from "./Search";
import NewRequest from "./NewRequest";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}


export default function CreateExchange() {

    const {content: {cards, stickers, pages}, hooks: {openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    const [text, setText] = useState('');
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userCards, setUserCards] = useState<GetDeckResponse['cards'] | null>(null);
    const [userStickers, setUserStickers] = useState<GetDeckResponse['stickers'] | null>(null);


    if (!cards || !stickers || !pages) {
        return <></>
    }

    const searchElement = <Search 
        text={text} setText={setText} 
        users={users} setUsers={setUsers}
        clickUser={clickUser}    
    />;

    return <VStack w='100%' align='center'>
        {searchElement}
        {userCards && userStickers && userInfo
            ? <NewRequest
                reqUser={userInfo} userCards={userCards} userStickers={userStickers}
            /> : <></>}
    </VStack>


    async function clickUser(info: UserInfo) {

        setUserInfo(info);
        const response = await api.getUserDeck(info.id);
        const data = response.data as GetDeckResponse;

        setUserCards(data.cards);
        setUserStickers(data.stickers);

        setText('');
        setUsers([]);
    }

}






