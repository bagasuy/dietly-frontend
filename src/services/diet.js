import api from "./api"

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
}

export async function getDietEntries(token) {
  const response = await api.get(
    "/diet/",
    authHeaders(token),
  )

  return response.data
}

export async function createDietEntry(token, data) {
  const response = await api.post(
    "/diet/",
    data,
    authHeaders(token),
  )

  return response.data
}

export async function updateDietEntry(token, id, data) {
  const response = await api.patch(
    `/diet/${id}/`,
    data,
    authHeaders(token),
  )

  return response.data
}

export async function deleteDietEntry(token, id) {
  const response = await api.delete(
    `/diet/${id}/`,
    authHeaders(token),
  )

  return response.data
}

export async function getWeightHistory(token) {
  const response = await api.get(
    "/diet/weight/",
    authHeaders(token),
  )

  return response.data
}

export async function createWeightEntry(token, data) {
  const response = await api.post(
    "/diet/weight/",
    data,
    authHeaders(token),
  )

  return response.data
}
