import React from 'react';

const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }

    const notificationMessage = {
        background: 'lightgrey',
        width: '50%',
        fontSize: 17,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        color: success ? 'green' : 'red'
    }

    return (
        <div style={notificationMessage}>
            {message}
        </div>
    )
}

export default Notification