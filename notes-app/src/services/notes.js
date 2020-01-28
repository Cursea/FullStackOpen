import axios from 'axios';

/*
use http://localhost:3001/notes for using own server
use fixed url https://protected-island-73178.herokuapp.com/notes/2 to hook up with Heroku back-end
use relative link api/notes if frontend and backend are at the same address in Heroku
*/
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// Shorthand property names (ES2015)
export default { getAll, create, update }

