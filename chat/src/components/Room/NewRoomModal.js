import React from 'react';
import ReactDOM from 'react-dom';

export default function NewRoomModal ({ room, setCreateRoomModal, createRoomModal, createNewRoom}) {
    return ReactDOM.createPortal((
        <div className='createNewRoomModal'>
            <h3>Create a new room</h3>
            <label htmlFor='createNewRoomInput'> Roomname:
                <input type='text' id='createNewRoomInput' placeholder='Roomname' />
            </label>
            <button className='createNewRoomModal__closebtn' onClick={() => setCreateRoomModal(false)}>Close</button>
            <button className='createNewRoomModal__createRoombtn' onClick={createNewRoom}>Create room</button>
        </div>
    ), document.body);
}