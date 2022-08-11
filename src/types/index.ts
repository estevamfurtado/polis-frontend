export type token = string | null;

export type Card = {
    id: number
    createdAt: Date
    updatedAt: Date
    stickerId: number
    isPasted: boolean
    isNew: boolean
    ownerId: number | null
}

export type Ranking = {
    id: number
    createdAt: Date
    updatedAt: Date
    year: number
    title: string
}

export type Politician = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    description: string
    personId: number
    officialId: string
    partyAbbreviation: string
    stateAbbreviation: string
    imageUrl: string
}


export type Party = {
    id: number
    createdAt: Date
    updatedAt: Date
    cnpj: string
    name: string
    logoUrl: string | null
    abbreviation: string
    email: string | null
    password: string | null
    mainColor: string | null
    secondaryColor: string | null
    about: string | null
}

export type State = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    abbreviation: string
}

export type Record = {
    id: number
    createdAt: Date
    updatedAt: Date
    politicianId: number | null
    sourceId: string | null
    sourceUrl: string | null
    sourceName: string | null
    rankingId: number
    partyRecordId: number
    partyAbbreviation: string | null
    stateAbbreviation: string | null
    candidateType: string | null
    quantityVote: number | null
    reelected: boolean | null
    cutAidShift: boolean | null
    isPresident: boolean | null
    cutHousingAllowance: boolean | null
    cutRetirement: boolean | null
    requestedFamilyPassport: boolean | null
    quotaAmountSum: number | null
    scorePresence: number | null
    scoreSaveQuota: number | null
    scoreProcess: number | null
    scoreInternal: number | null
    scorePrivileges: number | null
    scoreWastage: number | null
    scoreTotal: number | null
    scoreRanking: number | null
    scoreRankingByPosition: number | null
    scoreRankingByParty: number | null
    scoreRankingByState: number | null
    scorePresenceFormula: string | null
    scoreProcessFormula: string | null
    scorePrivilegesFormula: string | null
    scoreSaveQuotaFormula: string | null
    scoreWastageFormula: string | null
    scoreTotalFormula: string | null
    parliamentarianCount: number | null
    parliamentarianStateCount: number | null
    parliamentarianStaffMaxYear: number | null
    parliamentarianQuotaMaxYear: number | null
    stickerId: number | null
}

export type PartyRecord = {
    id: number
    createdAt: Date
    updatedAt: Date
    rankingYear: number
    partyAbbreviation: string
    scorePresenceSum: number
    scorePresenceCount: number
    scorePresence: number
    scoreSaveQuotaSum: number
    scoreSaveQuotaCount: number
    scoreSaveQuota: number
    scoreProcessSum: number
    scoreProcessCount: number
    scoreProcess: number
    scoreInternalSum: number
    scoreInternalCount: number
    scoreInternal: number
    scorePrivilegesSum: number
    scorePrivilegesCount: number
    scorePrivileges: number
    scoreWastageSum: number
    scoreWastageCount: number
    scoreWastage: number
    scoreTotalSum: number
    scoreTotalCount: number
    scoreTotal: number
}


export type Album = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    year: number
    description: string
    coverUrl: string | null
    thumbUrl: string | null
}

export type Page = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    description: string
    backgroundColor: string | null
    albumId: number
    orderInAlbum: number
}

export type Sticker = {
    id: number
    createdAt: Date
    updatedAt: Date
    orderInPage: number
    pageId: number
    type: string
    availability: string
    identifier: string
    title: string
    imageUrl: string
    politicianRecordId: number | null
    partyRecordId: number | null
}

export type Person = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    cpf: string | null
    password: string | null
    phone: string | null
    email: string | null
    birthDate: Date | null
    sex: string | null
    gender: string | null
    economicClass: string | null
    skinColor: string | null
    voteStateAbbreviation: string | null
    diplomaticAxis: number | null
    economicAxis: number | null
    civilAxis: number | null
    socialAxis: number | null
    packs: number
}

export type CompleteRanking = Ranking & {
    partyRecords: CompletePartyRecord[];
    records: CompleteRecord[];
}

export type CompletePartyRecord = (PartyRecord & {
    party: Party;
})

export type CompleteRecord = (Record & {
    politician: Politician;
    party: Party;
})

export type CompleteAlbum =  Album & {
    pages: CompletePage[];
}

export type CompletePage = (Page & {
    stickers: CompleteSticker[];
})

export type CompleteSticker = (Sticker & {
    politicianRecord: Record;
    partyRecord: PartyRecord;
})


export type MyDeck = {
    
    packs: number;
    deck: Deck;
    
}

export type Deck = {
    stickers: {
        byId: {
            [stickerId: number]: {
                pasted: number[],
                notPasted: number[],
            };
        },
        ids: number[]
    }
    cards: {
        byId: {[cardId: number]: Card},
        arrays: {
            all: number[],
            pasted: number[],
            notPasted: number[],
        }
    }
}

export type RankingGroup = {
    title : string
    color: string
    records: CompleteRecord[]
}