import React from 'react'
import { IndividualOrderProduct } from '../Cards/IndividualOrderProduct'

export const OrderProducts = ({order}) => {

    // console.log(products);
    
    return order.map((order)=>(
        <IndividualOrderProduct key = {order.ID} order={order}
         
        />
    ))
}
