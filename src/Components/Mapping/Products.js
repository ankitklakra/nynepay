import React from 'react'
import {IndividualProduct} from '../Cards/IndividualProduct'

export const Products = ({products,addToCart}) => {
    return products.map((individualProduct)=>(
        <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct} addToCart={addToCart}
        />
    ))
}
