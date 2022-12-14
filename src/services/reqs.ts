import { GetDeckResponse, GetAlbumResponse, GetRankingResponse, Person, UserInfo } from "../types/index.js";
import api from "./api.js";

function headers () {
  const token = localStorage.getItem("polis_token");
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}


export async function signUp(data: any, referralId: string | null) {
  try {
    const params = referralId ? `?referralId=${referralId}` : '';
    const response = await api.post("/auth/sign-up" + params, data);
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function signIn(data: any) : Promise<{token: string, user: Person}> {
  const response = await api.post("/auth/sign-in", data);
  return response.data as {token: string, user: Person}
}

export async function updateUser(data: any) {
  try {
    const response = await api.put("/user/", data, {headers: headers()});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

// ------------------------------------------------

export async function getUser() {
  const response = await api.get("/user/", {headers: headers()});
  if (response.status === 200) {
    return response.data as Person;
  } else {
    throw response;
  }
}

export async function getRanking() {
  const response = await api.get("/ranking/", {headers: headers()});
  if (response.status === 200) {
    return response.data as GetRankingResponse;
  } else {
    throw response;
  }
}

export async function getDeck() {
  const response = await api.get("/deck/", {headers: headers()});
  if (response.status === 200) {
    return response.data as GetDeckResponse;
  } else {
    throw response;
  }
}

export async function getAlbum() {
  const response = await api.get("/album/", {headers: headers()});
  if (response.status === 200) {
    return response.data as GetAlbumResponse;
  } else {
    throw response;
  }
}

// -----------------


export async function pasteCard(id: number) {
  try {
    const response = await api.post(`/deck/paste/${id}`, {}, {headers: headers()});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function pasteAll() {
  try {
    const response = await api.post(`/deck/paste-all`, {}, {headers: headers()});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function openOnePack() {
  try {
    const response = await api.post(`/deck/packs/open-one`, {}, {headers: headers()});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function openAllPacks() {
  try {
    const response = await api.post(`/deck/packs/open-all`, {}, {headers: headers()});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}


export async function searchUsers (username: string) {

  const search = new URLSearchParams({username}).toString();

  try {
    const response = await api.get(`/user/search/username?${search}`, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function getUserDeck (id: number) {
  try {
    const response = await api.get(`/user/deck/${id}`, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function toggleMark (id: number) {
  try {
    const response = await api.put(`/deck/toggle-mark/${id}`, {}, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function postExchangeRequest (userId: number, offeredCards: number[], requestedCards: number[]) {
  try {
    const response = await api.post(`/deck/exchange/request`, {
      userId, offeredCards, requestedCards
    }, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function getExchangeRequests () {
  try {
    const response = await api.get(`/deck/exchange/requests`, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function acceptRequest (id: number) {
  try {
    const response = await api.put(`/deck/exchange/${id}/accept`, {}, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function cancelRequest (id: number) {
  try {
    const response = await api.put(`/deck/exchange/${id}/cancel`, {}, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function rejectRequest (id: number) {
  try {
    const response = await api.put(`/deck/exchange/${id}/reject`, {}, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}

export async function realizePacks () {
  try {
    const response = await api.post(`/deck/packs/realize`, {}, {headers: headers()});
    return {...response}
  }
  catch (error: any) {
    return {...error}
  }
}