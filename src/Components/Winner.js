import React from 'react'
import {IndividualWinners} from './IndividualWinners'

export const Winner = ({winner}) => {
    
    return winner.map((individualWinners)=>(
        <IndividualWinners key = {individualWinners.ID} individualWinners={individualWinners}
        />
    ))
}
