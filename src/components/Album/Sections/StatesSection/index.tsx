
import { useContext, useEffect, useState } from 'react';
import Pages from '../Pages'
import CenterLoading from '../../../CenterLoading';
import { AlbumContext } from '../../../../contexts/AlbumContext';

export default function StatesSection () {
    const [loading, setLoading] = useState(true);
    const {albumData: {data: {pagesByStates}}} = useContext(AlbumContext)
    useEffect(()=>{
        setLoading(false);
    }, [])

    return loading ? <CenterLoading/>
        : <Pages pages={pagesByStates} type={'states'}/>;
}