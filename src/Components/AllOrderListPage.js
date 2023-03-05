import React,{useState,useEffect} from 'react'
import {auth,fs} from '../Config/Config'
import { OrderProducts } from './OrderProducts';
import useFullPageLoader from '../hooks/useFullPageLoader'
export const AllOrderListPage= (props) => {

     
  // state of products
     
  const [order, setBid]=useState([]);
  const [loader,showLoader,hideLoader]= useFullPageLoader();
  // getting current user uid
  function GetUserUid(){
   const [uid, setUid]=useState(null);
   useEffect(()=>{
     showLoader();
       auth.onAuthStateChanged(user=>{
           if(user){
             setUid(user.uid);
             const docRef =  fs.collection('Admin').doc(user.uid)
             docRef.get().then((doc)=>{
              if (doc.exists){
              console.log('success')
              hideLoader();
             }else{
              console.log('not user')
              props.history.push('/');   
             }
           })
         }else{
           console.log('not user')
           props.history.push('/');   
         }
       })
     },[])  
     return uid;
}

const uid = GetUserUid();

  var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];
 
  var date = new Date();

  var month = date.getMonth(); // returns 0 - 11
 
  var year = date.getFullYear();
  
  // console.log(props.location.state.key)

  // getting products function

  const getUsers = async ()=>{
    if (props.location.state.key != null){
      const bid = await fs.collection('Bid'+months[month] + year).doc(props.location.state.key).collection('bidlist').orderBy('productbid','desc').get();
       
      const bidArray = [];
      
      for (var snap of bid.docs){
          
        var data = snap.data();
        
        data.ID = snap.id;
        
        bidArray.push({
          ...data
        })
          
        if(bidArray.length === bid.docs.length){
            
          setBid(bidArray);
        }
      }
    }else{
      props.history.push('/login');
    }
       
    }
    
  useEffect(()=>{
    getUsers();
   },[])  
  

  return (
    <>         
    <br></br>
    {order.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>{props.location.state.key.FullName} Orders</h1>
            <div className='products-box'>
            <OrderProducts order={order} />
            </div>
        </div>
    )}
    {order.length < 1 && (
        <div className='container-fluid'>Please wait....</div>
    )}
    {loader}
   </>
  );
};
