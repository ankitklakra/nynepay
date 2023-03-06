import React,{useState,useEffect} from 'react'
import useFullPageLoader from '../hooks/useFullPageLoader'
import {fs,auth} from '../Config/Config'
import { BidUsers } from './BidUsers';
import { useNavigate } from 'react-router-dom';
export const BidListPage= (props) => {
  const navigate = useNavigate();
  // state of products
  const [bid, setBid]=useState([]);
  var [mon, setMonth]=useState('');
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
              navigate('/error');  
             }
           })
         }else{
           console.log('not user')
           navigate('/error');  
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

//   var loadprevdata= ()=>{
//     console.log('cliked');
//     month = month-1;
//     setMonth(months[month] + year);
//     getUsers()
//  }
//  var loadnextdata= ()=>{
//    console.log('cliked');
//    month = month+1;
//    setMonth(months[month] + year);
//    getUsers()
// }
  // getting products function
  const getUsers = async ()=>{
    
    const bid = await fs.collection('Bid'+months[month] + year).where('Totalbid','>=',1).orderBy('Totalbid','desc').get();
     
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
  
    }
    const openProductlist = (op)=>{
        props.history.push({
        pathname:"/all-orders",
        state:{key:op}
    });
    
    }
    useEffect(()=>{
       getUsers();
    },[])           

  return (
    <>         
    <br></br>
    {bid.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>Bid List</h1>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">

        {/* <div className='btn btn-danger btn-md' onClick={loadprevdata} > prev </div>   */}
        <div class="text align-center "> 
            <span> {months[month] + year}</span> 
                </div>
        {/* <div className='btn btn-danger btn-md' onClick={loadnextdata}> next </div>  */}
        </div>
            <div className='products-box'>
                <BidUsers bid={bid} openProductlist={openProductlist}/>
            </div>
        </div>
    )}
    {bid.length < 1 && (<div className='container-fluid'>Please wait....</div> )}
    {loader}
   </>
  );
};
