import React from 'react'
import { IndividualBidUsers } from '../Cards/IndividualBidUsers'

export const BidUsers = ({bid,openProductlist}) => {
    
    return bid.map((individualBidUsers)=>(
        <IndividualBidUsers key = {individualBidUsers.ID} individualBidUsers={individualBidUsers}
        openProductlist={openProductlist}
        />
    ))
}
