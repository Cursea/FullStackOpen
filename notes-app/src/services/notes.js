import axios from 'axios';

const baseUrl = `http://localhost:3001/notes` //use https://protected-island-73178.herokuapp.com/notes/2 to hook up with heroku back-end

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

