import React from 'react';
import axios from '../../../part2-notes/node_modules/axios';

const Countries = ({ country, filter }) => {

    const countryName = () => {
        if (filter == '') {
            return ''
        } else {
            return country
                .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
                .map(country =>
                    <div key={country.callingCodes}>{country.name}</div>)
        }
    }

    return (
        <div>
            {countryName()}
        </div>
    )
}

export default Countries