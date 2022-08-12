import api from "./api";

const token = localStorage.getItem("polis_token");
const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};



export async function signUp(data: any) {
  try {
    const response = await api.post("/auth/sign-up", data);
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function signIn(data: any) {
  try {
    const response = await api.post("/auth/sign-in", data);
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function updateUser(data: any) {
  try {
    const response = await api.put("/user/", data, {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function getUser() {
  try {
    const response = await api.get("/user/", {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function getRanking() {
  try {
    const response = await api.get("/ranking/", {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function getAlbum() {
  try {
    const response = await api.get("/album/", {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function getDeck() {
  try {
    const response = await api.get("/deck/", {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function pasteCard(id: number) {
  try {
    const response = await api.post(`/deck/paste/${id}`, {}, {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function pasteAll() {
  try {
    const response = await api.post(`/deck/paste-all`, {}, {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function openOnePack() {
  try {
    const response = await api.post(`/deck/packs/open-one`, {}, {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}

export async function openAllPacks() {
  try {
    const response = await api.post(`/deck/packs/open-all`, {}, {headers});
    return {...response}
  } catch (error: any) {
    return {...error}
  }
}