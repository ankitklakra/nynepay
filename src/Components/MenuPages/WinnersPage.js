import React,{useState, useEffect} from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Image,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';

import { Winner } from '../Mapping/Winner'
import {fs} from '../../Config/Config'
import img from '../../Resources/undraw_Loading.png';


export const WinnersPage = () => {

  // state of products
  const [winner, setWinners]=useState([]);

  // getting products function
  const getWinners = async ()=>{
      const winner = await fs.collection('Winners').get();
      const winnerArray = [];
      for (var snap of winner.docs){
          var data = snap.data();
          data.ID = snap.id;
          winnerArray.push({
              ...data
          })
          if(winnerArray.length === winner.docs.length){
              setWinners(winnerArray);
          }
      }
  }

  useEffect(()=>{
      getWinners();
  },[])



  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>

    {winner.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>Winners</h1>
            <div className='products-box'>
                <Winner winner={winner}/>
            </div>
        </div>
    )}
    {winner.length < 1 && (
     <Box boxSize='sm'>
     <Image src={img} alt='loading' />
   </Box>
    )}
   </Flex>
  );
};
