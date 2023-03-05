import React from 'react'
import * as AiIcons from "react-icons/ai";

export const IndividualRefUsers = ({individualRefUsers}) => {

    return (
        <div className='product'>
            <div className='product-img2'>
                <img src={individualRefUsers.ProfileImage} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualRefUsers.FullName}</div>
            <div className='user-text'><AiIcons.AiOutlinePhone/>{individualRefUsers.Phone} </div>
            <div className='user-text'> <AiIcons.AiOutlineMail/> {individualRefUsers.Email} </div>
            <div className='user-text'> <AiIcons.AiOutlineUser/> {individualRefUsers.RefCode}</div>
            <div className='user-text'>Code use: {individualRefUsers.Totaluse}</div>
        </div>  
    )
}