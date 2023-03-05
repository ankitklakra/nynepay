import React from 'react'
import { IndividualUsers } from './IndividualUsers'

export const Users = ({users}) => {
    
    return users.map((individualUsers)=>(
        <IndividualUsers key = {individualUsers.ID} individualUsers={individualUsers}
        />
    ))
}
