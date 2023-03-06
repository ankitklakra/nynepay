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
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import {storage,fs,auth} from '../Config/Config'
import useFullPageLoader from '../hooks/useFullPageLoader'
import { useNavigate } from 'react-router-dom';
export const AddWinners = (props) => {
    const navigate = useNavigate();
    var date = new Date();
    const [winnername, setWinnerName]=useState('');
    const [image, setImage]=useState(null);
    const [imageError, setImageError]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];

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

    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            } 
        }
        else{
            console.log('please select your file');
        }
    }

    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask=storage.ref(`winner-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('winner-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Winners').add({
                    winnername,
                    url,
                    Created:date
                }).then(()=>{
                    setSuccessMsg('Winner added successfully');
                    setWinnerName('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }
  
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Winners</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Winner Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setWinnerName(e.target.value)} value={winnername}></input>
                <br></br>
                <label>Upload Winner Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}
                {loader}
        </div>
        </Flex>
    )
}