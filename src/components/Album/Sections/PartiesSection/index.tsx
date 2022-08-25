
import { useContext } from 'react';
import Pages from '../Pages'
import {DataContext} from '../../../../contexts/DataContext'
import {PagesSection} from '../../../../contexts/AlbumContext'

export default function PartiesSection () {
    const {content:{pagesByParties}} = useContext(DataContext)
    return <Pages pages={pagesByParties} type={PagesSection.parties}/>;
}