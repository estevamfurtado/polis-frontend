export type token = string | null;


/**
 * Model State
 * 
 */
export type State = {
id: number
createdAt: Date
updatedAt: Date
name: string
abbreviation: string
}

/**
 * Model Person
 * 
 */
 export type Person = {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string | null
    name: string | null
    cpf: string | null
    password: string | null
    phone: string | null
    email: string | null
    birthDate: Date | null
    sex: Sex | null
    gender: string | null
    economicClass: EconomicClass | null
    skinColor: SkinColor | null
    voteStateAbbreviation: string | null
    politicalPosition: PoliticalPosition | null
    diplomaticAxis: number | null
    economicAxis: number | null
    civilAxis: number | null
    socialAxis: number | null
    packs: number
    lastFreePackAt: Date | null
    lastPackAt: Date | null
    isActive: boolean
}
  
/**
 * Model Friendship
 * 
 */
export type Friendship = {
id: number
createdAt: Date
updatedAt: Date
userId: number
friendId: number
status: FriendshipStatus
}

/**
 * Model Party
 * 
 */
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

/**
 * Model Politician
 * 
 */
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

/**
 * Model Ranking
 * 
 */
export type Ranking = {
id: number
createdAt: Date
updatedAt: Date
year: number
title: string
}

/**
 * Model Record
 * 
 */
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

/**
 * Model PartyRecord
 * 
 */
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

/**
 * Model Album
 * 
 */
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

/**
 * Model Page
 * 
 */
export type Page = {
id: number
createdAt: Date
updatedAt: Date
badge: string
title: string
description: string
backgroundColor: string | null
albumId: number
orderInAlbum: number
}

/**
 * Model Sticker
 * 
 */
export type Sticker = {
id: number
createdAt: Date
updatedAt: Date
orderInPage: number
pageId: number
type: StickerTypes
availability: StickerAvailabilityTypes
identifier: string
title: string
imageUrl: string
politicianRecordId: number | null
partyRecordId: number | null
}

/**
 * Model Card
 * 
 */
export type Card = {
id: number
createdAt: Date
updatedAt: Date
stickerId: number
isPasted: boolean
forExchange: boolean
ownerId: number | null
}

/**
 * Model ExchangeRequest
 * 
 */
export type ExchangeRequest = {
id: number
createdAt: Date
updatedAt: Date
status: ExchangeStatus
proposerId: number
requestedId: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Sex = {
    Male: 'Male',
    Female: 'Female'
};

export type Sex = (typeof Sex)[keyof typeof Sex]


export const EconomicClass ={
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E'
};

export type EconomicClass = (typeof EconomicClass)[keyof typeof EconomicClass]


export const SkinColor = {
    White: 'White',
    Black: 'Black',
    Brown: 'Brown',
    Yellow: 'Yellow',
    Other: 'Other'
};

export type SkinColor = (typeof SkinColor)[keyof typeof SkinColor]


export const PoliticalPosition = {
    left: 'left',
    right: 'right',
    center: 'center'
};

export type PoliticalPosition = (typeof PoliticalPosition)[keyof typeof PoliticalPosition]


export const FriendshipStatus = {
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
    canceled: 'canceled'
};

export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus]


export const StickerTypes = {
    party: 'party',
    politician: 'politician',
    moment: 'moment'
};

export type StickerTypes = (typeof StickerTypes)[keyof typeof StickerTypes]


export const StickerAvailabilityTypes = {
    easy: 'easy',
    medium: 'medium',
    rare: 'rare'
};

export type StickerAvailabilityTypes = (typeof StickerAvailabilityTypes)[keyof typeof StickerAvailabilityTypes]


export const ExchangeStatus ={
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
    canceled: 'canceled'
};

export type ExchangeStatus = (typeof ExchangeStatus)[keyof typeof ExchangeStatus]






// ---------------------------------------------------------



export type CompleteCard = Card & {
    sticker: CompleteSticker
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
    records: number[]
}

export type CompleteExchangeRequest = (ExchangeRequest & {
    proposer: Person;
    requested: Person;
    cardsOffered: CompleteCard[]
    cardsRequested: CompleteCard[]
})


// ----------------- new data models

// ranking


export type GetRankingResponse = {
    rankings: {
        parties: RankingGroup[],
        ranking: RankingGroup[],
    },
    politicians: {[key: number]: Politician},
    politicianRecords: {[key: number]: Record},
    partyRecords: {[key: number]: PartyRecord},
    states: {[key: string]: State},
    parties: {[key: string]: Party},
}

export type GetDeckResponse = {
    album: Album & {pages: number[]},
    pages: {[key: number]: Page & {stickers: number[]}},
    stickers: {[key: number]: Sticker & {cards: CardsCatalog}},
    cards: {
        cards: {[key: number]: Card},
        deck: CardsCatalog
    },
    packs: {
        new: number,
        link: number,
        lastPackAt: number,
    },
    exchangeRequests: CompleteExchangeRequest[],
    pagesByStates: FunctionalPage[],
    pagesByParties: FunctionalPage[],
}



export type CardsCatalog = {
    all: number[],
    pasted: number[],
    notPasted: {
        all: number[],
        new: number[],
        repeated: number[],
        favorites: number[],
        recent: number[],
    }
}

export type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}


export type UserInfo = {
    id: number;
    email?: string;
    name?: string;
    username?: string;
}