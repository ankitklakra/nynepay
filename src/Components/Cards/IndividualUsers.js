import React from 'react'
import * as AiIcons from "react-icons/ai";
export const IndividualUsers = ({individualUsers}) => {
   
    return (
        <div className='product'>
            <div className='product-img2'>
                <img src={individualUsers.ProfileImage} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualUsers.FullName}</div>
            <div className='user-text'><AiIcons.AiOutlinePhone/>{individualUsers.Phone} </div>
            <div className='user-text'> <AiIcons.AiOutlineMail/> {individualUsers.Email} </div>
            <div className='user-text'> <AiIcons.AiOutlineUser/> {individualUsers.RefCode}</div>
        </div> 
    )
}