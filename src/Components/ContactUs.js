import {
	Flex,
	Button,
	Center,
	Box,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
export const ContactUs = () => {
	const handleclick = () => {
		window.open('mailto:contact.nynepay@gmail.com?subject=Subject&body=Type%20something%20here')
	}
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>

			<Center py={6}>
				<Box  maxW={'320px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
					<Text margin={'20px'} >
						We will reach you out soon.

					</Text>
					<Button onClick={handleclick}
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						bg={'blue.400'}
						color={'white'}
						boxShadow={
							'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
						}
						_hover={{
							bg: 'blue.500',
						}}
						_focus={{
							bg: 'blue.500',
						}}>
						Contact us
					</Button>
				</Box>
			</Center>


		</Flex>
	);
};
