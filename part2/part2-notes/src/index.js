import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import axios from 'axios';

const promise = axios
    .get('http://localhost:3001/notes')
    .then(response => {
        const notes = response.data
        ReactDOM.render(
            <App notes={notes} />,
            document.getElementById('root')
        )
    })
console.log(promise)


const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA