import React from 'react';

const Filter = ({filter, setFilter}) => {
    return (
        <div>
            <label htmlFor="filter">Filter countries</label>
            <input 
              value={filter}
              onChange={setFilter}
              id="filter"
            />
        </div>
    )
}

export default Filter