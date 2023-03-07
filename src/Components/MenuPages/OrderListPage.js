import React,{useState,useEffect} from 'react'
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
import {auth,fs} from '../../Config/Config'
import img from '../../Resources/undraw_Loading.png';

import { OrderProducts } from '../Mapping/OrderProducts';
export const OrderListPage= (props) => {

  // state of products
     
  var [order, setBid]=useState([]);
  const [mon, setMonth]=useState('');
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

  var date = new Date();

  var month = date.getMonth(); // returns 0 - 11
 
  var year = date.getFullYear();
  
  function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
                
            }else{
                props.history.push('/login');
            }
        })
    },[])
    return uid;
}

const uid = GetUserUid();
 
  // console.log(uid)

  // getting products function

  var loadprevdata= ()=>{
     console.log('cliked');
     month = month-1;
     
     setMonth(months[month] + year);
     getUsers()
	}
  var loadnextdata= ()=>{
    console.log('cliked');
    month = month+1;
    setMonth(months[month] + year);
    getUsers()
 }
  
  var getUsers = async ()=>{  
     if (uid != null) {
     const bids =await fs.collection('Bid'+months[month] + year).doc(uid).collection('bidlist').orderBy('productbid','desc').get();
     
     const bidArray = [];
     for (var snap of bids.docs){  
      var data = snap.data();
      data.ID = snap.id;
      bidArray.push({
         ...data
      })
       
      if(bidArray.length === bids.docs.length){
        setBid(bidArray);
        setMonth(months[month] + year);
      }else{
        setBid(0);
      }
     }
   }else{
     if (auth.currentUser != null){
       const bids = await fs.collection('Bid'+months[month] + year).doc(auth.currentUser.uid).collection('bidlist').orderBy('productbid','desc').get();
       const bidArray = [];
       for (var snap of bids.docs){  
        var data = snap.data();
        data.ID = snap.id;
        bidArray.push({
           ...data
        })
         
        if(bidArray.length === bids.docs.length){
          setBid(bidArray);
          setMonth(months[month] + year);
        }else{
          setMonth(months[month] + year);
        }
       }
     }else{
       console.log('auth is null')
     }
   }
      
   }

    getUsers();

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    {order.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>MY Orders </h1>
            {/* <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">

        <div className='btn btn-danger btn-md' onClick={loadprevdata} > prev </div>  
        <div class="text align-center "> 
            <span> {mon}</span> 
                </div>
        <div className='btn btn-danger btn-md' onClick={loadnextdata}> next </div> 
        </div> */}
            <div className='products-box'>
            <OrderProducts order={order} />
            </div>
        </div>
    )}
    {order.length < 1 && (
       <Box boxSize='sm'>
       <Image src={img} alt='loading' />
     </Box>
    )}
   </Flex>
  );
};
