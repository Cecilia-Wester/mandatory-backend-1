import React from 'react';
import ReactDOM from 'react-dom';

export default function NewRoomModal (){
    return ReactDOM.createPortal((
        <div className='createNewRoomModal'>
            <h3>Create a new room</h3>
            <label htmlFor='createNewRoomInput'> Roomname:
                <input type='text' id='createNewRoomInput' placeholder='Roomname' />
            </label>
        </div>
    ), document.body);
}