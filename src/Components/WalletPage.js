import React, { useState, useEffect } from 'react'
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
import { auth, fs } from '../Config/Config'
import logo from '../Resources/nbtfull.gif';
import img from '../Resources/undraw_Loading.png';

export const WalletPage = () => {

    // state of products
    const [winner, setWinners] = useState();

    var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

    var date = new Date();

    var month = date.getMonth(); // returns 0 - 11

    var year = date.getFullYear();
    // getting products function
    const getWinners = async () => {
        const docRef = fs.collection('Bid' + months[month] + year).doc(auth.currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const usersRef = fs.collection('Bid' + months[month] + year).doc(auth.currentUser.uid)
                usersRef.get()
                    .then((docSnapshot) => {
                        var biddata = docSnapshot.data().Totalbid;
                        setWinners(biddata);
                    })
            } else {

            }
        });
    }

    useEffect(() => {
        getWinners();
    }, [])



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <div className='container-fluid' >
                <h1 className='text-center' >Wallet </h1>
                <div className="container  d-flex justify-content-center" >
                    <div className='wallet' >
                        <img src={logo} alt="product-img2" />
                    </div> </div> </div>

            {winner != null && (
                <div className="fab-container" >
                    <div className="iconbutton" >{winner} </div>
                </div>
            )}
           


        </Flex>
    );
};