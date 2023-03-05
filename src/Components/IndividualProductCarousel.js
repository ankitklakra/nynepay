import React, { useState, useEffect } from 'react'
import { auth, fs } from '../Config/Config'
import 'bootstrap/dist/css/bootstrap.css';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';

export const IndividualProductCarousel = ({ individualProductCarousel, addToCart }) => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);

    // getting current user uid

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid();
                    fs.collection('users').doc(user.uid).get().then(function (doc) {
                        setFullName(doc.data().FullName);
                        setEmail(doc.data().Email);
                        setPhone(doc.data().Phone);
                        setPhoto(doc.data().ProfileImage);
                    })
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();

    // if (uid != null) {

    // }

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
    async function addToCart(product) {
        if (uid !== null) {

            Product = product;

            var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

            var date = new Date();

            var month = date.getMonth(); // returns 0 - 11

            var year = date.getFullYear();

            const now = Date.now();



            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Are you online?')
                return
            }

            const options = {
                key: __DEV__ ? 'rzp_test_D6oAkDdW0BBxSc' : 'rzp_live_J2SC76kYBsHf9H',
                currency: "INR",
                amount: 900,
                name: 'NYNEPAY',
                image: 'https://e7.pngegg.com/pngimages/178/28/png-clipart-computer-icons-money-bag-bank-cash-angle-hand-thumbnail.png',
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    // alert(response.razorpay_order_id)
                    // alert(response.razorpay_signature)

                    const docRef = fs.collection('Bid' + months[month] + year).doc(uid);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            const usersRef = fs.collection('Bid' + months[month] + year).doc(uid)
                            usersRef.get()
                                .then((docSnapshot) => {
                                    var biddata = docSnapshot.data().Totalbid;

                                    const prodRef = fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID)
                                    prodRef.get()
                                        .then((prodsnap) => {
                                            if (prodsnap.exists) {
                                                fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).update({
                                                    productbid: prodsnap.data().productbid + Number(1)
                                                }).then(() => {
                                                    fs.collection('Bid' + months[month] + year).doc(uid).update({
                                                        Totalbid: biddata + Number(1)

                                                    }).then(() => {
                                                        console.log('successfully bid');


                                                    })

                                                })
                                            } else {




                                                Product['productbid'] = 1;
                                                Product['time'] = date;
                                                console.log('i am ipc ')
                                                fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).set(Product).then(() => {
                                                    console.log('successfully bid');

                                                }).then(() => {
                                                    fs.collection('Bid' + months[month] + year).doc(uid).update({
                                                        Totalbid: biddata + Number(1)

                                                    }).then(() => {
                                                        console.log('successfully bid');


                                                    })

                                                })

                                            }

                                        })

                                })
                        } else {
                            // fs.collection('Bid' + months[month] + year).doc(uid).set({
                            //     Id: uid,
                            //     FullName: fullname,
                            //     Email: email,
                            //     Phone: phone,
                            //     ProfileImage: photo,
                            //     Totalbid: Number(1),
                            //     Created: date
                            // }).then(() => {

                            //     fs.collection('Bid' + months[month] + year).doc(uid).collection('bidlist').doc(Product.ID).set(Product).then(() => {

                            //     })

                            // });
                        }
                    });

                    const docRef2 = fs.collection('NynepayBiddingToken').doc(uid);
                    docRef2.get().then((doc2) => {
                        if (doc2.exists) {
                            fs.collection('NynepayBiddingToken').doc(uid).collection('nbtlist').doc(now).set({
                                id: now,
                                Created: date
                            }).then(() => {

                            })
                        } else {
                            // fs.collection('NynepayBiddingToken').doc(uid).set({
                            //     Id: uid,
                            //     FullName: fullname,
                            //     Email: email,
                            //     Phone: phone,
                            //     ProfileImage: photo,
                            //     Totalbid: Number(1),
                            //     Created: date
                            // }).then(() => {
                            //     fs.collection('NynepayBiddingToken').doc(uid).collection('nbtlist').doc(now).set({
                            //         id:now,
                            //         Created:date
                            //     }).then(() => {

                            //     })

                            // });
                        }
                    });
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
            // props.history.push('/login');
        }
    }

    return (
        <>
            {/* <div style={{ textAlign: "center" }}>
                <img 
                    className="multi__image"
                
                    src={individualProductCarousel.url}
                    alt=""
                    style={{
                        width: "100%",
                        height: "170px",
                        objectFit: "contain",
                        marginBottom: "10px",
                    }}
                />
                <p style={{ fontSize: "14px", padding: "5px 0" }}>{individualProductCarousel.title}</p>
                <p style={{ fontSize: "16px", padding: "5px 0", color: "green" }}>
                    ₹ {individualProductCarousel.price}
                </p>
                <p className='btn btn-danger btn-sm cart-btn' onClick={addToCart} style={{ fontSize: "14px", }}>
                    BID NOW
                </p>
            </div> */}

            <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
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
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Brand
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {individualProductCarousel.title}
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                               ₹ {individualProductCarousel.price}
                            </Text>
                            
                        </Stack>
                    </Stack>
                </Box>
            </Center>

        </>
    )
}