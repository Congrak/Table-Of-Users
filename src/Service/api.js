const BASE_URL = 'https://randomuser.me/api'

export const UsersResults = async () => {
    const res = await fetch(`${BASE_URL}?results=100`)
    const data = await res.json()
    return data.results
}