import React from 'react';
import './Infobar.css';
const closeIcon='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png';
const onLIneIcon='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png'


const Infobar = ({room}) =>{
    return(
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onLIneIcon} alt="online icon"/>
            <h3> {room}  </h3>
        </div>
        <div className='rightInnerContainer'>
        <a href='/'><img src={closeIcon} alt="close "/></a>
        </div>
    </div>
    );
}

export default Infobar;
