import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = numberObject => {
    const request = axios.post(baseUrl, numberObject)
    return request.then(response => response.data)
}
const update = (id, numberObject) => {
    const request = axios.put(`${baseUrl}/${id}`, numberObject)
    return request.then(response => response.data)
}

const deletePerson = (id, numberObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, numberObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }