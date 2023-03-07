import React,{useState, useEffect} from 'react'
import {fs,auth} from '../../Config/Config'
import { RefUsers } from '../Mapping/RefUsers';
import useFullPageLoader from '../../hooks/useFullPageLoader'
import { useNavigate } from 'react-router-dom';
export const UserCodeListPage = (props) => {
  const navigate = useNavigate();
    // state of products
    const [users, setUsers]=useState([]);

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
    // getting products function
    const getUsers = async ()=>{
        const user = await fs.collection('RefCode').where('Totaluse','>',0).orderBy('Totaluse','desc').get();
        const userArray = [];
        for (var snap of user.docs){
            var data = snap.data();
            data.ID = snap.id;
            userArray.push({
                ...data
            })
            if(userArray.length === user.docs.length){
                setUsers(userArray);
            }
        }
    }
  
    useEffect(()=>{
        getUsers();
    },[])

  return (
    <>         
    <br></br>
    {users.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>Ref Code</h1>
            <div className='products-box'>
                <RefUsers users={users}/>
            </div>
        </div>
    )}
    {users.length < 1 && (
        <div className='container-fluid'>Please wait....</div>
    )}
     {loader}
   </>
  );
};
