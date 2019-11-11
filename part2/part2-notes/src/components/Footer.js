import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, property of marco henriques burman esq.</em>
        </div>
    )
}

export default Footer