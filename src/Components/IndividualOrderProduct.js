import React from 'react'

export const IndividualOrderProduct = ({order}) => {
   
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={order.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{order.title}</div>
            <div className='product-text description'>{order.description}</div>
            <div className='product-text price'>$ {order.price}</div>
            <div className='btn btn-danger btn-md cart-btn' >Total Bid {order.productbid}</div>
        </div> 
    )
}