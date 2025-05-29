import React from 'react';
import { Box, SimpleGrid, Image, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const MultiItemCategory = ({ categories }) => {
    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Shop by Category</Text>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
                {categories.map((category) => (
                    <Link
                        as={RouterLink}
                        to={`/category/${category.categoryname}`}
                        key={category.ID}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.05)' }}
                        >
                            <Image
                                src={category.url}
                                alt={category.categoryname}
                                height="200px"
                                width="100%"
                                objectFit="cover"
                            />
                            <Box p={4}>
                                <Text fontSize="lg" fontWeight="semibold">
                                    {category.categoryname}
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default MultiItemCategory;