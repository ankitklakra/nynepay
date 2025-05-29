import React, { useState, useEffect } from 'react';
import {
  Box,
  useColorModeValue,
  Image,
  Heading,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import img from '../../Resources/undraw_Loading.png';
import { Products } from '../Mapping/Products';
import 'bootstrap/dist/css/bootstrap.css';
import { auth, fs } from '../../Config/Config';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data if logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fs.collection('users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            setUser(doc.data());
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const productsSnapshot = await fs.collection(categoryName).get();
        const productsArray = [];
        
        for (const snap of productsSnapshot.docs) {
          const data = snap.data();
          productsArray.push({
            ...data,
            ID: snap.id
          });
        }
        
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [categoryName]);

  const addToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Your existing addToCart logic here
    console.log('Adding to cart:', product);
  };

  return (
    <Box
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Container maxW="container.xl" py={8}>
        <Heading mb={6} textTransform="capitalize">{categoryName}</Heading>
        
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
            <Image src={img} alt='loading' />
          </Box>
        ) : products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            <Products products={products} addToCart={addToCart} />
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10}>
            <Heading size="md" color="gray.500">No products found in this category</Heading>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
