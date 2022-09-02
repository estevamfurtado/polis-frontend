
import { useContext, useEffect, useState } from 'react';
import Pages from '../Pages'
import CenterLoading from '../../../CenterLoading';
import { AlbumContext } from '../../../../contexts/AlbumContext';

export default function PartiesSection () {
    const [loading, setLoading] = useState(true);
    const {albumData: {data: {pagesByParties}}} = useContext(AlbumContext)

    useEffect(()=>{
        setLoading(false);
    }, [])

    return loading ? <CenterLoading/>
        : <Pages pages={pagesByParties} type={'parties'}/>;
}