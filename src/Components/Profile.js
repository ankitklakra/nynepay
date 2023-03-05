import React, { useState, useEffect } from 'react'
import '../Components/Profile.css';
import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";
import { auth, fs } from '../Config/Config'
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Icon,
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
export const Profile = (props) => {
    const navigate = useNavigate();
    // const currentUser = useContext(UserContext);
    // getting current user uid

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);
    const [code, setRefCode] = useState('');

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                } else {
                    navigate('/login');
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();

    if (uid != null) {
        fs.collection('users').doc(uid).get().then(function (doc) {
            setName(doc.data().FullName);
            setEmail(doc.data().Email);
            setPhone(doc.data().Phone);
            setPhoto(doc.data().ProfileImage);
            setRefCode(doc.data().RefCode);
        })
    } else {

    }
    const handleLogout = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            {/* <div className='container-fluid'>
                <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div class="card p-4">
                        <div class=" image d-flex flex-column justify-content-center align-items-center">
                            <button class="btn btn-secondary">
                                <img src={photo} height="100" width="100" alt="profile-img" />
                            </button> <span class="name mt-3"></span>{name} <span class="idd"></span>
                            <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                <span class="idd1">{ } </span>
                                <span><i class="fa fa-copy"></i></span>
                            </div>
                            <div class="d-flex flex-row justify-content-center align-items-center mt-3">
                                <span class="number"> <span class="follow"></span>
                                </span> </div>
                            <div class=" d-flex mt-2">
                                <div><Link className='navlink' to="edit-profile">
                                    <button type="button" class="btn btn-dark">Edit Profile</button>
                                </Link>
                                </div>
                            </div>
                            <div class="text mt-3">
                                <span><AiIcons.AiOutlinePhone /> {phone} </span>
                            </div>
                            <div class="text mt-3">
                                <span><AiIcons.AiOutlineMail /> {email} </span>
                            </div>
                            <div class="text mt-3">
                                <span><AiIcons.AiOutlineUser /> {code} </span>
                            </div>
                            <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                        <span><i class="fa fa-twitter"></i></span>
                        <span><i class="fa fa-facebook-f"></i></span> 
                        <span><i class="fa fa-instagram"></i></span>
                        <span><i class="fa fa-linkedin"></i></span> 
                        </div>

                            <div class=" px-2 rounded mt-4 date "> 
                        <span class="join">Joined May,2021</span> 
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className='btn btn-danger btn-md' onClick={handleLogout} >LOGOUT</div>
                </div>
            </div> */}
            <Center py={6}>
                <Box
                    maxW={'320px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={photo}
                        alt={'Avatar Alt'}
                        mb={4}
                        pos={'relative'}
                    />
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {name}
                    </Heading>
                    {/* <Text fontWeight={600} color={'gray.500'} mb={4}>
                        @lindsey_jam3s
                    </Text> */
                    /*                     
                    <Text
                        textAlign={'center'}
                        color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        Actress, musician, songwriter and artist. PM for work inquires or{' '}
                        <Link href={'#'} color={'blue.400'}>
                            #tag
                        </Link>{' '}
                        me in your posts
                    </Text> */}

                    <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'600'}>
                            Phone -
                            {phone}
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'600'}>
                            Email -
                            {email}
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'600'}>
                            Refferal Id -
                            {code}
                        </Badge>
                    </Stack>

                    <Stack mt={8} direction={'row'} spacing={4}>
                        <Link href='/edit-profile' >
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                _focus={{
                                    bg: 'gray.200',
                                }}>
                                Edit Profile
                            </Button>
                        </Link>
                        <Button onClick={handleLogout}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'red.400'}
                            color={'white'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'red.500',
                            }}
                            _focus={{
                                bg: 'red.500',
                            }}>
                            Logout
                        </Button>
                    </Stack>
                </Box>
            </Center>

        </Flex>
    );
}
