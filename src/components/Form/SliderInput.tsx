import { Text, Badge, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import Joi from "joi";
import Form from "."

type NumberProps = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: number | null;
    setState: (value: number) => void;
    placeholder?: string;
    errorMessage?: string;

    axisLabel?: {
        left: string;
        right:string;
    }
}

export default function SliderInput ({
    value, label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage, axisLabel
} : NumberProps) {

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: 'number',
        value, placeholder, state,
        onChange: (e : React.ChangeEvent<HTMLInputElement>) => {setState(parseInt(e.target.value))}
    }

    const leftLabel = `${axisLabel?.left} ${value}%`;
    const rightLabel = `${axisLabel?.right} ${100 - value}%`;

    return <Form {...formProps} >
        {axisLabel ? <Flex justify={'space-between'}>
            
            <Badge fontSize='0.7em' variant='subtle' colorScheme='red'>{leftLabel}</Badge>
            <Badge fontSize='0.7em' variant='subtle' colorScheme='blue'>{rightLabel}</Badge>
            
        </Flex> : <></>}
        <Slider value={value} onChange={ (v)=>{ setState(v) } }>
            <SliderTrack bg='blue.700' h={'10px'}>
                <SliderFilledTrack bg='red.500' h={'100%'}/>
            </SliderTrack>
            <SliderThumb box-shadow='md' boxSize={6} border='2px' borderColor='gray.200'/>
        </Slider>
    </Form>
}


// diviArray = ["Separatista","Confederalista","Descentralista","Neutro","Devolucionista","Centralista","Unitário"]
// govtArray = ["Anarquista","Libertário","Liberal","Moderado","Estatista","Autoritário","Totalitário"]
// diplArray = ["Cosmopolitano","Internacionalista","Conformista","Equilibrado","Patriótico","Nacionalista","Chauvinista"]
// miliArray = ["Junta Militar","Militarista","Paramilitarista","Militar Democrata","Neutro","Anti-Militarista","Pacifista"]
// protArray = ["Vigilância em massa Global","Vigilância em massa","Vigilância Policial","Neutro","Privacidade do Governo","Privacidade do Governo e Corporações","Privacidade Total"]
// econArray = ["Comunista","Socialista","Social Democrata","Centrista","Apoiante de Livre Mercado","Capitalista","Laissez-Faire"]
// reliArray = ["Anticlericalista","Laicista","Secularista","Neutro","Etocrata","Teocrata","Clericalista"]
// sctyArray = ["Revolucionário","Muito Progressista","Progressista","Neutro","Tradicional","Conservador","Reacionário"]
// cultArray = ["Monoculturalista","Multicomunitarista","Interculturalista","Neutro","Assimilacionista","Multiculturalista","Intraculturalista"]

// function setCLabel(val,ary) {
//     if (val > 100) { return "" } else
//     if (val > 90) { return ary[0] } else
//     if (val > 75) { return ary[1] } else
//     if (val > 60) { return ary[2] } else
//     if (val >= 40) { return ary[3] } else
//     if (val >= 25) { return ary[4] } else
//     if (val >= 10) { return ary[5] } else
//     if (val >= 0) { return ary[6] } else
//             {return ""}
// }