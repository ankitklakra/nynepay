import React from 'react'
import { IndividualRefUsers } from './IndividualRefUsers'

export const RefUsers = ({users}) => {
    
    return users.map((individualRefUsers)=>(
        <IndividualRefUsers key = {individualRefUsers.ID} individualRefUsers={individualRefUsers}
        />
    ))
}
