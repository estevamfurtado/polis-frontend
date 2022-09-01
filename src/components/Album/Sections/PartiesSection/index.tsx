
import { useContext, useEffect, useState } from 'react';
import Pages from '../Pages'
import {DataContext} from '../../../../contexts/DataContext'
import {AlbumContext, PagesSection} from '../../../../contexts/AlbumContext'
import { VStack } from '@chakra-ui/react';
import Page from '../Pages/Page';
import CenterLoading from '../../../CenterLoading';

export default function PartiesSection () {

    const {content:{pagesByParties}} = useContext(DataContext)
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        setLoading(false);
    }, [])

    return loading ? <CenterLoading/>
        : <VStack w='100%' gap='0' overflowY={'scroll'}>            
            {
                pagesByParties.map((pg, index) => {
                    return <Page key={index} page={pg} classType={PagesSection.parties}/>;
                })
            }
        </VStack>
}