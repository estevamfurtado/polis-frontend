
import { useContext, useEffect, useState } from 'react';
import Pages from '../Pages'
import {DataContext} from '../../../../contexts/DataContext'
import { PagesSection} from '../../../../contexts/AlbumContext'
import CenterLoading from '../../../CenterLoading';

export default function PartiesSection () {

    const [loading, setLoading] = useState(true);
    const {content:{pagesByParties}} = useContext(DataContext)
    
    useEffect(()=>{
        setLoading(false);
    }, [])

    return loading ? <CenterLoading/>
        : <Pages pages={pagesByParties} type={PagesSection.parties}/>;
}