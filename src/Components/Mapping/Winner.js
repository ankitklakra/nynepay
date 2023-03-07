import React from 'react'
import {IndividualWinners} from '../Cards/IndividualWinners'

export const Winner = ({winner}) => {
    
    return winner.map((individualWinners)=>(
        <IndividualWinners key = {individualWinners.ID} individualWinners={individualWinners}
        />
    ))
}
