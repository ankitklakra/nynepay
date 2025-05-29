import { useState, useEffect, lazy  } from 'react'
import {
    Flex,
    Box,
    useColorModeValue,
    Image,
} from '@chakra-ui/react';
import { fs } from '../../Config/Config'
import 'bootstrap/dist/css/bootstrap.css';
import img from '../../Resources/undraw_Loading.png';
import MultiItemCategory from '../ProductCarousel/MultiItemCategory';
// import MultiItemCarousel from '../ProductCarousel/MultiItemCarousel';
import MainCarousel from '../BannerCarousel';
import FashionCarousel from '../ProductCarousel/FashionCarousel';
import AppliancesCarousel from '../ProductCarousel/AppliancesCarousel';
// import AutoMobilesCarousel from '../ProductCarousel/AutoMobilesCarousel';
import BeautyCarousel from '../ProductCarousel/BeautyCarousel';
import BooksCarousel from '../ProductCarousel/BooksCarousel';
import FoodCarousel from '../ProductCarousel/FoodCarousel';
import KitchenCarousel from '../ProductCarousel/KitchenCarousel';
import MobileCarousel from '../ProductCarousel/MobileCarousel';
import SportsCarousel from '../ProductCarousel/SportsCarousel';
import TourCarousel from '../ProductCarousel/TourCarousel';
import ElectronicsCarousel from '../ProductCarousel/ElectronicsCarousel';
import HomeDecorCarousel from '../ProductCarousel/HomeDecorCarousel';
import JwelleryCarousel from '../ProductCarousel/JwelleryCarousel';
import OthersCarousel from '../ProductCarousel/OthersCarousel';

export const Home = (props) => {
    // state for categories and products
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // getting categories function
    const getCategories = async () => {
        try {
            const categoriesSnapshot = await fs.collection('Products').get();
            const categoriesArray = [];
            
            for (const snap of categoriesSnapshot.docs) {
                const data = snap.data();
                categoriesArray.push({
                    ...data,
                    ID: snap.id
                });
            }
            
            setCategories(categoriesArray);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <br></br>
            {!isLoading ? (
                <div className='container-fluid'>
                    <MainCarousel />
                    <MultiItemCategory categories={categories} />
                    {/* <MultiItemCarousel /> */}
                    <ElectronicsCarousel />
                    {/* <MobileCarousel /> */}
                    <FashionCarousel />
                    <AppliancesCarousel />
                    {/* <HomeDecorCarousel /> */}
                    {/* <KitchenCarousel /> */}
                    {/* <SportsCarousel /> */}
                    <BeautyCarousel />
                    <BooksCarousel />                      
                    <JwelleryCarousel />
                    <FoodCarousel />
                    <TourCarousel />
                    <OthersCarousel />
                    <br></br>
                </div>
            ) : (
                <Box boxSize='sm'>
                    <Image src={img} alt='loading' />
                </Box>
            )}
        </Flex>
    )
}

