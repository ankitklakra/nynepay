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

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();

    let biddata;
    // const docRef2 = fs.collection('NynepayBiddingToken').doc(uid);
    // async function getBidData() {
    //   const doc2 = await docRef2.get();
    //   if (doc2.exists) {
    //     const docSnapshot2 = await docRef2.get();
    //     biddata = docSnapshot2.data().Totalbid;
    //   } else {
        biddata = '0';
    //   };
    //   return biddata;
    // }
    

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

            
                <div className="fab-container" >
                    <div className="iconbutton" >{biddata} </div>
                </div>
            



        </Flex>
    );
};