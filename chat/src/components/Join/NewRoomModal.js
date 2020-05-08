import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function NewRoomModal ({ room, setRoom, name, setName, setCreateRoomModal}) {
    const [reDirectTo,setRedirectTo] = useState(false)

    function handleCreateRoom(e){
        e.preventDefault()
        //postRoom(room);
        console.log('when do I happen')
        axios.post('/chat', {
            room: room
        })
        .then((response) => {
            console.log(response);
            setRoom(room);
            setRedirectTo(true)
        })
        .catch(err => {
            console.log(err);
        });
    }
    

    //function postRoom(room){
    //     console.log('when do I happen')
    //     axios.post('/rooms', {
    //         room: room
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         setRoom(room);
    //         setRedirectTo(true)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    return ReactDOM.createPortal((
        <div className='createNewRoomModal'>
            <h3>Create a new room</h3>
                <br/>
            <form onSubmit={(e) =>  handleCreateRoom(e)}>
                <label htmlFor='modalUsername' className='inputfieldlabel'> Username: 
                    <input type='text' id='Modalusername'  className='joinInput' placeholder='Enter username' onChange={(e) => setName(e.target.value)}></input>
                </label>
                <br/>
                <label htmlFor='ModalRoom' className='inputfieldlabel'> Chatroom:
                    <input type='text' id='modalRoom'  className='joinInput' placeholder='Enter name on room to enter' onChange={(e) => setRoom(e.target.value)}/>
                </label>
                <button  className='signInBtn' type='submit' >Enter room</button>
                {reDirectTo && <Redirect to={`/chat?name=${name}&room=${room}`} />}
                <button className='createNewRoomModal__closebtn' onClick={() => setCreateRoomModal(false)}>Close</button>
            </form>
        </div>
    ), document.body);
}