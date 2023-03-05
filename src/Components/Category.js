import React from 'react'
import { IndividualCategory } from './IndividualCategory'

export const Category = ({category,addToCategory}) => {
    return category.map((individualCategory)=>(
        <IndividualCategory key = {individualCategory.ID} individualCategory={individualCategory} addToCategory={addToCategory}
        />
    ))
}
