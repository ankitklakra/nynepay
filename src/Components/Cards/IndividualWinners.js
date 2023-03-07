import React from 'react'

export const IndividualWinners = ({individualWinners}) => {

    return (
        <div className='product'>
            <div className='product-img2'>
                <img src={individualWinners.url} alt="winner-img"/>
            </div>
        </div> 
    )
}