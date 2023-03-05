import {
    Link,
    Box,
} from '@chakra-ui/react';

export const IndividualCategory = ({ individualCategory, addToCategory }) => {
    const handleAddToCategory = () => {
     
        return ;
    }
    return (
        <Box>
        <Link href={individualCategory.categoryname}  >
            <div classname='single-item'>
                <div className='category-divs' onClick={handleAddToCategory}>
                    <div className='category-imgs'>
                        <img src={individualCategory.url} height="50" width="50" alt="product-img" className="roundimage" />
                    </div>
                </div>
                <div className='text-center'style={{ fontSize: "10px", }} >{individualCategory.categoryname}</div>
            </div>
        </Link>
        </Box>
    )
}