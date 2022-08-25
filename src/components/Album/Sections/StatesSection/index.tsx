
import { useContext } from 'react';
import Pages from '../Pages'
import {DataContext} from '../../../../contexts/DataContext'
import {PagesSection} from '../../../../contexts/AlbumContext'

export default function StatesSection () {
    const {content:{pagesByStates}} = useContext(DataContext)
    return <Pages pages={pagesByStates} type={PagesSection.states}/>;
}