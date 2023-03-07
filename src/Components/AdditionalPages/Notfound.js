import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react';
export const Notfound = () => {
    return (
        <Box height="80vh" textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, pink.400, pink.600)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you're looking for does not seem to exist
        </Text>
  
        <Button
          colorScheme="pink"
          bgGradient="linear(to-r, pink.400, pink.500, pink.600)"
          color="white"
          as={'a'}
          href={'/home'}
          variant="solid">
          Go to Home
        </Button>
      </Box>
    )
}
