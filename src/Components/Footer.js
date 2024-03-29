import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {

return (
  <Box
  bg={useColorModeValue('gray.50', 'gray.900')}
  color={useColorModeValue('gray.700', 'gray.200')}>
  <Container
    as={Stack}
    maxW={'6xl'}
    py={4}
    direction={{ base: 'column', md: 'row' }}
    spacing={4}
    justify={{ base: 'center', md: 'space-between' }}
    align={{ base: 'center', md: 'center' }}
    >
    <Stack direction={'row'} spacing={6}>
      {/* <Link href={'/'}>Home</Link> */}
      <Link href={'/about-us'}>About</Link>
      <Link href={'/contact-us'}>ContactUs</Link>
      <Link href={'/privacy-policy'}>Privacy Policy</Link>
      <Link href={'/terms-and-conditions'}>T & C</Link>
    </Stack>
    <Text>© 2022 NYNEPAY. All rights reserved</Text>
  </Container>
</Box>
);
};
export default Footer;
