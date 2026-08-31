import api from "./api"

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
}

export async function getPredictions(token) {
  const response = await api.get(
    "/prediction/",
    authHeaders(token),
  )

  return response.data
}

export async function createPrediction(token, weight) {
  const response = await api.post(
    "/prediction/",
    { weight },
    authHeaders(token),
  )

  return response.data
}
