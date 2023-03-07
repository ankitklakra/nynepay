import { useState, useEffect } from 'react'
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
import MultiItemCarousel from '../ProductCarousel/MultiItemCarousel';
import MainCarousel from '../BannerCarousel';
import FashionCarousel from '../ProductCarousel/FashionCarousel';
import AppliancesCarousel from '../ProductCarousel/AppliancesCarousel';
import AutoMobilesCarousel from '../ProductCarousel/AutoMobilesCarousel';
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

    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }
    useEffect(() => {
        getProducts();
    }, [])


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                        <MultiItemCategory />
                        <MainCarousel />
                        <MultiItemCarousel />
                        <ElectronicsCarousel />
                        <MobileCarousel />
                        <FashionCarousel />
                        <AppliancesCarousel />
                        <HomeDecorCarousel />
                        <KitchenCarousel />
                        <SportsCarousel />
                        <BeautyCarousel />
                        <BooksCarousel />
                        <AutoMobilesCarousel />
                        <JwelleryCarousel />
                        <FoodCarousel />
                        <TourCarousel />
                        <OthersCarousel />
                        <br></br>
                   
                </div>
            )}
            {products.length < 1 && (
                <Box boxSize='sm'>
                    <Image src={img} alt='loading' />
                </Box>
            )}

        </Flex>
    )
}

