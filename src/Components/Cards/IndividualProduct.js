import React from 'react'
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
} from '@chakra-ui/react';

export const IndividualProduct = ({ individualProduct, addToCart }) => {

    const handleAddToCart = () => {
        addToCart(individualProduct);
    }
    
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                margin={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${individualProduct.url})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={individualProduct.url}
                    />
                </Box>
                <Stack pt={10} align={'center'}>

                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {individualProduct.title}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            ₹ {individualProduct.price}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} align={'center'}>

                    <Button
                       
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        onClick={handleAddToCart}
                       
                        _hover={{
                            bg: 'pink.300',
                        }}
                    >
                        Bid Now
                    </Button>
                    </Stack>

                </Stack>
            </Box>
        </Center>
    )
}