export type token = string | null;

export type card = {
    createdAt: string;
    updatedAt: string;
    modelId: number;
    isPasted: boolean;
    ownerId: number;
}

export type deck = {
    packs: number;
    deck: {
        models: {
            byId: {[key: number]: [number]},
            ids: [number]
        }
        cards: {
            byId: {[key: number]: card},
            arrays: {
                all: [number],
                pasted: [number],
                notPasted: [number],
            }
        }
    }
}

export type ranking = {
    id: number;
    year: number;
    title: string;
    records: {id: number}[];
    partyRecords: {id: number}[];
}

export type politician = {
    id: number;
    name: string;
    description: string;
    personId: number;
    officialId: number;
    partyAbbreviation: string;
    stateAbbreviation: string;
    imageUrl: string;
    records: {id: number}[];
}

export type candidate = {}

export type party = {
    id: number;
    name: string;
    abbreviation: string;
    cnpj: string;
    logoUrl: string;
    mainColor: string | null;
    secondaryColor: string | null;
    about: string;
    politicians: {id: number}[];
    records: {id: number}[];
    candidates: {id: number}[];
    PartyRecord: {id: number}[];
}

export type state = {
    id: number;
    name: string;
    abbreviation: string;
    politicians: {id: number}[];
    records: {id: number}[];
    candidates: {id: number}[];
}

export type record = {
    id: number;
    politicianId: number;
    sourceId: string;
    sourceUrl: string;
    sourceName: string;
    rankingId: number;
    partyRecordId: number;
    partyAbbreviation: string;
    stateAbbreviation: string;
    candidateType: string;
    quantityVote: number;
    reelection: boolean;
    cutAidShift: boolean;
    isPresident: boolean;
    cutHousingAllowance: boolean;
    cutRetirement: boolean;
    requestedFamilyPassport: boolean;
    quotaAmountSum: number;
    scorePresence: number;
    scoreSaveQuota: number;
    scoreProcess: number;
    scoreInternal: number;
    scorePrivileges: number;
    scoreWastage: number;
    scoreTotal: number;
    scoreRanking: number;
    scoreRankingByPosition: number;
    scoreRankingByParty: number;
    scoreRankingByState: number;
    scorePresenceFormula: string;
    scoreProcessFormula: string;
    scorePrivilegesFormula: string;
    scoreSaveQuotaFormula: string;
    scoreWastageFormula: string;
    scoreTotalFormula: string;
    parliamentarianCount: number;
    parliamentarianStateCount: number;
    parliamentarianStaffMaxYear: number;
    parliamentarianQuotaMaxYear: number;
}

export type partyRecord = {
    id: number;
    rankingYear: number;
    partyAbbreviation: string;
    records: {id: number}[];
    scores: {
        id: number;
        type: string;
        totalScore: number;
        count: number;
        average: number;
        partyRecordId: number;
    }[];
}

export type cardModel = {
    id: number;
    recordId: number;
    variant: string;
    record: {id: number};
    stickers: {id: number}[];
    imageUrl: string;
}

export type album = {
    "id": number;
    "title": string;
    "year": number;
    "description": string;
    "coverUrl": string | null;
    "thumbUrl": string | null;
    "entryPageId": number;
    "pages": {id: number}[];
}

export type page = {
    "id": number;
    "title": string;
    "description": string;
    "backgroundColor": string;
    "successorId": number;
    "albumId": number;
    "entryStickerId": number;
    "stickers": {id: number}[];
    "album": {id: number};
    "entryInAlbum": {id: number} | null;
}

export type sticker = {
    "id": number;
    "pageId": number;
    "cardId": number;
    "identifier": string;
    "successorId": number;
    "page": {
        "id": number;
    },
    "entryInPage": {
        "id": number;
    } | null;
}

export type person = {
    id: number;
    name?: string | null;
    cpf?: string | null;
    password?: string | null;
    phone?: string | null;
    email?: string | null;

    birthDate?: string;
    economicClass?: string;

    voteStateAbbreviation?: string;
    contactId?: number | null;

    diplomaticAxis?: number | null;
    economicAxis?:   number | null;
    civilAxis?:      number | null;
    socialAxis?:     number | null;

    reactions: {id: number}[]
    
}