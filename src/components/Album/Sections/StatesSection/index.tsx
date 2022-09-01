
import { useContext, useEffect, useState } from 'react';
import Pages from '../Pages'
import {DataContext} from '../../../../contexts/DataContext'
import {PagesSection} from '../../../../contexts/AlbumContext'
import CenterLoading from '../../../CenterLoading';

export default function StatesSection () {
    const {content:{pagesByStates}} = useContext(DataContext)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(false);
    }, [])

    return loading ? <CenterLoading/>
        : <Pages pages={pagesByStates} type={PagesSection.states}/>;
}