import React from 'react'
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';

export const IndividualBidUsers = ({individualBidUsers,openProductlist}) => {
    const handeluser=()=>{
        openProductlist(individualBidUsers.ID);
    }
    return (
        <div className='product'>
            <div className='product-img2'>
                <img src={individualBidUsers.ProfileImage} alt="product-img"onClick={handeluser}/>
            </div>
            <div className='product-text title'>{individualBidUsers.FullName}</div>
            <div className='user-text'><AiIcons.AiOutlinePhone/>{individualBidUsers.Phone} </div>
            <div className='user-text'> <AiIcons.AiOutlineMail/> {individualBidUsers.Email} </div>
            <div className='user-text'> <AiIcons.AiOutlineUser/> {individualBidUsers.RefCode}</div>
            <div className='user-text'>Total bid: {individualBidUsers.Totalbid}</div>
        </div>  
    )
}