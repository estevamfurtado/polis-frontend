import { Box, Button, Heading, VStack, Text, HStack, Wrap, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



export default function About() {
    return (

        <VStack w='100%' align='center' overflowY={'scroll'} >

            <VStack w='100%' align='center' maxW='700px' >
                <VStack w='100%' p='5'>
                    <Heading w='100%' size='md' textAlign={'center'}>
                        O que você quer ver hoje?
                    </Heading>
                </VStack>

                <Wrap justify='center' w='100%' padding='5'>
                    <SiteBox emoji='🏆' title='Ranking' goTo={'ranking'} description='Veja o desempenho dos deputados federais' />
                    <SiteBox emoji='🃏' title='Álbum' goTo={'album'} description='Complete o álbum dos Deputados' />
                </Wrap>

                <Wrap justify='center' w='100%' padding='5'>

                    {/* 
                        Queremos usar tecnologia para engajar o povo com os dados
                        da política de uma forma orgânica, leve e divertida.
                        Acreditamos que o engajamento é catalisador da melhoria dos
                        incentivos do jogo político brasileiro no médio e no longo prazo.

                        Dados = institucionais e de desempenho.
                        - Institucionais: quantos partidos? quantos deputados? Qual o orçamento? etc.
                        - Desempenho: quem gastou menos? quem votou melhor? etc.
                        
                        Sabemos que dados de desempenho são muitas vezes subjetivos
                        e, por isso, suscetíveis aos vieses do avaliador. Para mitigar esses riscos:
                        - Transparência: buscar os melhores dados e ser transparente com todas as fontes.
                        - Progresso: no caso de disputas, não ser refém da visão unilateral/partidária.
                            Queremos ter uma visão pragmática do que leva o Brasil adiante no médio prazo.

                    */}
                </Wrap>

            </VStack>

        </VStack>
    )

    function SiteBox ({title, description, emoji, goTo}: {title: string, description: string, emoji: string, goTo: string}) {
        
        const navigate = useNavigate()

        const goToPage = () => {

            // navigate to root/goTo
            navigate(`/${goTo}`)
        }
        
        return (
            <Flex align='center' justify='center' w='40%' h='200px'
                padding={5}
                bg='white'
                borderRadius='5'
                border='1px solid' borderColor={'gray.200'}
                cursor='pointer'

                _hover={{
                    bg: 'yellow.100',
                    borderColor: 'yellow.300',
                    boxShadow: '5px 5px 0px rgba(0,0,0,0.05)',
                }}

                onClick={goToPage}
            >
                <VStack align='center'>
                    <Heading size='sm'>{emoji}</Heading>
                    <Heading size='sm'>{title}</Heading>
                    <Text fontSize='sm' textAlign={'center'}>
                        {description}
                    </Text>
                </VStack>
            </Flex>
        )
    }

    function Valor ({title, description, emoji}: {title: string, description: string, emoji?: string}) {
        return (
            <Flex align='center' justify='center' w='30%' h='100px'
                padding={5}
                bg='white'
                borderRadius='5'
                border='1px solid' borderColor={'gray.200'}
                cursor='pointer'

                _hover={{
                    bg: 'yellow.100',
                    borderColor: 'yellow.300',
                    boxShadow: '5px 5px 0px rgba(0,0,0,0.05)',
                }}
            >
                <VStack align='center'>
                    {emoji ? <Heading size='sm'>{emoji}</Heading> : <></>}
                    <Heading size='xs'>{title}</Heading>
                    <Text fontSize='sm' textAlign={'center'}>
                        {description}
                    </Text>
                </VStack>
            </Flex>
        )
    }
}