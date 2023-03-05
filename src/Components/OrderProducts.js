import React from 'react'
import { IndividualOrderProduct } from './IndividualOrderProduct'

export const OrderProducts = ({order}) => {

    // console.log(products);
    
    return order.map((order)=>(
        <IndividualOrderProduct key = {order.ID} order={order}
         
        />
    ))
}
