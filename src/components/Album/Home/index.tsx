import { Heading, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { AlbumViewContext } from "../../../contexts/AlbumViewContext"

export default function Home() {

    const {mode} = useContext(AlbumViewContext);

    useEffect(()=>{
        mode.set('other');
    },[]);

    const questions : {q:string, a: string[]}[] = [
        {q: 'O que é o Polis?', a: [
            'O Polis é uma iniciativa civil que quer usar a tecnologia para aproximar a População do universo da Política brasileira.',
        ]},
        {q: 'O que é o Álbum dos Políticos?', a: [
            'É um álbum 100% online e gratuito que transforma os partidos e os deputados federais em figurinhas para você colecionar e trocar!',
            'Queremos que você se divirta e conheça melhor os +20 partidos e +500 deputados federais que atuam hoje no Brasil.',
            'Usamos os dados do Ranking dos Políticos para ordenar o álbum do melhor para o pior partido, do melhor para o pior deputado federal.',
        ]},
        {q: 'Como ganhar novas figurinhas?', a: [
            'Quando cria um login, você recebe um álbum vazio e 40 pacotinhos, cada um com 5 figurinhas.',
            'A cada 20 minutos, você pode pegar 2 pacotinhos de graça.',
            'Troque suas figurinhas repetidas com amigos ou jogue e ganhe mais pacotinhos ;)'
        ]},
        {q: 'O que é o número que aparece nas figurinhas?', a: [
            'Mostramos qual a posição do deputado no Ranking dos Políticos e uma cor para indicar se ele está no topo ou em uma posição ruim no ranking.',
            'Por exemplo, a deputada Adriana Ventura, do Partido Novo de SP, é a #1 (primeira colocada) no Ranking dos Políticos.'
        ]},
        {q: 'De onde vêm as notas?', a: [
            'Todas as avaliações apresentadas pelo Polis vêm do Ranking dos Políticos. Recomendamos que você acesse o Ranking dos Políticos para se aprofundar no desempenho de cada parlamentar da esfera nacional.'
        ]},

    ]

    return <VStack alignItems={'start'} p='5' spacing='10'>
        {questions.map(question => {
            return <Question q={question.q} a={question.a}/>
        })}
    </VStack>
}

function Question({q, a} : {q: string, a: string[]}) {
    
    return <VStack spacing='2' alignItems={'start'}>
        <Heading size='sm'>{q}</Heading>
        {a.map(t => {
            return <Text fontSize='sm'>{t}</Text>
        })}
    </VStack>
}