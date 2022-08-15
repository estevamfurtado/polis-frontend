import { StarIcon, CloseIcon, CheckIcon, Search2Icon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, InputGroup, InputLeftElement, Select, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingContext } from "../../../contexts/RankingContext";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export function ControleRanking() {

    const {width} = useWindowDimensions();

    const {
        showGood, setShowGood,
        showNeutral, setShowNeutral,
        showBad, setShowBad,
        search, setSearch,
        groupBy, setGroupBy,
        showState, setShowState,
    } = useContext(RankingContext);

    const searchBar = width > 700 ? searchBarBuilder() : <></>
    
    const showGoodButton = showTypeButtonBuilder('Show good', 'green', showGood, setShowGood, <StarIcon/>);
    const showNeutralButton = showTypeButtonBuilder('Show neutral', 'purple', showNeutral, setShowNeutral, <CheckIcon/>);
    const showBadButton = showTypeButtonBuilder('Show bad', 'red', showBad, setShowBad, <CloseIcon/>);

    const groupBySelect = groupBySelectBuilder();

    const showStateSelect = showStateSelectBuilder();

    return <Flex h='100%' align='center' justify='center' px='5' w='100%'>
        <Flex h='100%' w='100%' maxW='750px' align='center' justify='space-between' gap='50px'>
            {searchBar}
            <HStack flex='0 0 auto'>
                <HStack>
                    {showGoodButton}
                    {showNeutralButton}
                    {showBadButton}
                </HStack>
                {groupBySelect}
                {showStateSelect}
            </HStack>
        </Flex>
    </Flex>

    function searchBarBuilder () { 
        return <HStack flex='1 0 auto'>
            <InputGroup size='sm' bg='white'>
                <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={<Search2Icon boxSize={'4'}/>}
                />
                <Input placeholder='Deputado' borderColor='gray.200' onChange={onChange}/>
            </InputGroup>
        </HStack>

        function onChange (e: React.ChangeEvent<HTMLInputElement>) {
            setSearch(e.target.value);
        }
    }

    function showTypeButtonBuilder (label: string, colorScheme: string, show: boolean, setShow: (value:boolean)=>void, icon: JSX.Element) { 
        return <IconButton
            bg={show ? 'white' : 'gray.200'}
            aria-label={label}
            size='sm'
            icon={icon}
            color={show ? colorScheme : 'gray.400'}
            onClick={() => {
                setShow(!show);
            }}
        />
    }
    
    function groupBySelectBuilder () { 
        return <Select placeholder='Ordenar por' size='sm' bg='white' borderColor='gray.200' onChange={changeHandler}>
            <option value='party'>Partidos</option>
            <option value='tier'>Ranking</option>
        </Select>
        function changeHandler (e: React.ChangeEvent<HTMLSelectElement>) {
            setGroupBy(e.target.value as 'party' | 'tier');
        }
    }

    function showStateSelectBuilder () { 
        return <Select placeholder='Estado' size='sm' bg='white' borderColor='gray.200' onChange={changeHandler}>
            <option value='Todos'>Todos</option>
            {stateAbbreviations.map(a => {
                return <option key={a} value={a}>{a}</option>
            })}
        </Select>
        function changeHandler (e: React.ChangeEvent<HTMLSelectElement>) {
            setShowState(e.target.value);
        }
    }

}

const stateAbbreviations = [ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" ];