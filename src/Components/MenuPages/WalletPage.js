import { useState, useEffect } from 'react'
import {
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { auth, fs } from '../../Config/Config'
import logo from '../../Resources/nbtfull.gif';

export const WalletPage = () => {
    const [token, setToken] = useState('0');
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

    if (uid !== null) {
        fs.collection('NynepayBiddingToken').doc(uid).get().then(function (doc) {
            setToken(doc.data().Totalbid);
        })
    }

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
                <div className="iconbutton" >{token} </div>
            </div>

        </Flex>
    );
};