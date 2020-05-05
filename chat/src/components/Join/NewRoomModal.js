import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function NewRoomModal ({ room, setRoom, name, setName, setCreateRoomModal, createNewRoom}) {
    return ReactDOM.createPortal((
        <div className='createNewRoomModal'>
            <h3>Create a new room</h3>
            <form>
                <label htmlFor='modalUsername' className='inputfieldlabel'> Username: 
                    <input type='text' id='Modalusername'  className='joinInput' placeholder='Enter username' onChange={(e) => setName(e.target.value)}></input>
                </label>
                <br/>
                <label htmlFor='ModalRoom' className='inputfieldlabel'> Chatroom:
                    <input type='text' id='modalRoom'  className='joinInput' placeholder='Enter name on room to enter' onChange={(e) => setRoom(e.target.value)}/>
                </label>
                <br/>
                <Link onSubmit={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='signInBtn' type='submit'>Enter room</button>
                </Link>
                <button className='createNewRoomModal__closebtn' onClick={() => setCreateRoomModal(false)}>Close</button>
            </form>
        </div>
    ), document.body);
}