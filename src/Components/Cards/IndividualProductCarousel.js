import React from 'react'
import { useState, useEffect } from 'react';
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

import { auth, fs } from '../../Config/Config';
import { useNavigate } from 'react-router-dom';

export const IndividualProductCarousel = ({ individualProductCarousel  }) => {

    const navigate = useNavigate();
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleAddToCart = () => {
        addToCart(individualProductCarousel);
    }

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
        fs.collection('users').doc(uid).get().then(function (doc) {
            setFullName(doc.data().FullName);
            setEmail(doc.data().Email);
            setPhone(doc.data().Phone);
            setPhoto(doc.data().ProfileImage);
        })
    }

    const __DEV__ = document.domain === 'localhost'

    const loadScript = (src) => {

        return new Promise((resolve) => {

            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    let Product;
    const addToCart = (product) => {
        if (uid !== null) {
            Product = product;
            console.log(Product);
            console.log(Product.ID);
            const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            const date = new Date();
            const month = date.getMonth(); // returns 0 - 11
            const year = date.getFullYear();
            console.log(months[month] + year);
            const now = Date.now();
            const res = loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                alert('Are you online?');
                return;
            }
            const options = {
                key: __DEV__ ? 'rzp_test_D6oAkDdW0BBxSc' : 'rzp_live_J2SC76kYBsHf9H',
                currency: "INR",
                amount: 900,
                name: 'NYNEPAY',
                image: 'https://e7.pngegg.com/pngimages/178/28/png-clipart-computer-icons-money-bag-bank-cash-angle-hand-thumbnail.png',
                handler: async function (response) {
                    alert(response.razorpay_payment_id);
                    const docRef = fs.collection(`Bid${months[month]}${year}`).doc(uid);
                    const doc = await docRef.get();
                    const usersRef = fs.collection(`Bid${months[month]}${year}`).doc(uid);
                    if (doc.exists) {
                        console.log('doc exists');
                        const docSnapshot = await usersRef.get();
                        const biddata = docSnapshot.data().Totalbid;
                        const prodRef = fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID);
                        const prodsnap = await prodRef.get();
                        if (prodsnap.exists) {
                            console.log('doc exists 1');
                            await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).update({
                                productbid: prodsnap.data().productbid + Number(1)
                            });
                        } else {
                            console.log('doc exists 2');
                            console.log(uid);
                            console.log(Product.ID);
                            console.log(Product);
                            Product['productbid'] = 1;
                            Product['time'] = date;
                            await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).set(Product);
                        }
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).update({
                            Totalbid: biddata + Number(1)
                        });
                        console.log('successfully bid');
                    } else {
                        console.log('first time');
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).set({
                            Id: uid,
                            FullName: fullname,
                            Email: email,
                            Phone: phone,
                            ProfileImage: photo,
                            Totalbid: Number(1),
                            Created: date
                        });
                        Product['productbid'] = 1;
                        Product['time'] = date;
                        await fs.collection(`Bid${months[month]}${year}`).doc(uid).collection('bidlist').doc(Product.ID).set(Product);
                    }

                    const docRef2 = fs.collection('NynepayBiddingToken').doc(uid);
                    const doc2 = await docRef2.get();
                    if (doc2.exists) {
                        const docSnapshot2 = await docRef2.get();
                        const biddata = docSnapshot2.data().Totalbid;
                        await fs.collection('NynepayBiddingToken').doc(uid).update({
                            Totalbid: biddata + Number(1)
                        });

                    }
                    else {
                        await fs.collection('NynepayBiddingToken').doc(uid).set({
                            Id: uid,
                            FullName: fullname,
                            Email: email,
                            Phone: phone,
                            ProfileImage: photo,
                            Totalbid: Number(1),
                            Created: date
                        });
                    };

                },

                prefill: {
                    name: fullname,
                    email: email,
                    contact: phone
                },
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }
        else {
            navigate('/login');
        }
    }

    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                margin={1}
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
                        backgroundImage: `url(${individualProductCarousel.url})`,
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
                        src={individualProductCarousel.url}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                   
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {individualProductCarousel.title}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            ₹ {individualProductCarousel.price}
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