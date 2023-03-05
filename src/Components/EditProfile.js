import React,{useState,useEffect} from 'react'
import '../Components/Profile.css';
import {auth,fs,storage} from '../Config/Config'
import useFullPageLoader from '../hooks/useFullPageLoader'
import imageCompression from 'browser-image-compression';
export const EditProfile = (props) => {
    const now = Date.now()
    var [name, setFullName]=useState('');
    //   const [email, setEmail]=useState('');
    var [phone, setPhone]=useState('');
    var [photo, setPhoto]=useState(null);
    var [newphoto, setnewPhoto]=useState(null);
    //   const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError]=useState('');
    const [imageError, setImageError]=useState('');
    const types =['image/jpg','image/jpeg','image/png','image/PNG','image/webp'];
    const [loader,showLoader,hideLoader]= useFullPageLoader();
    const handleProfileImg=(e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
          if(selectedFile&&types.includes(selectedFile.type)){
              setImageError('');
              var options = {
                  maxSizeMB: 1,
                  maxWidthOrHeight: 512,
                  useWebWorker: true  
                }
                imageCompression(selectedFile, options)
                  .then(function (compressedFile) {
                     setnewPhoto(compressedFile);
                     console.log('compress done');
                  })
                  .catch(function (error) {
                    console.log(error.message);
                  });
          }
          else{
              setnewPhoto(null);
              setImageError('Please select a valid image file type (png or jpg)')
          } 
      }
      else{
          console.log('please select your file');
      }
  }
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                    const docRef = fs.collection('users').doc(user.uid)
                    docRef.get().then((doc)=>{
                        if (doc.exists){
                            setFullName(doc.data().FullName);
                            // setEmail(doc.data().Email);
                            setPhone(doc.data().Phone);
                            setPhoto(doc.data().ProfileImage);
                        }
                    })
                }else{
                    props.history.push('/');   
                }
            })
        },[])
        return uid;
    }
    const uid = GetUserUid();

    const updateData =(e)=> {
        showLoader();
        e.preventDefault();
        if (name != null){
            fs.collection('users').doc(uid).update({
                FullName:name
            }).then(()=>{
              setSuccessMsg('Profile update Successful');
              hideLoader();
              setTimeout(()=>{
                setSuccessMsg('');
                },5000)
            }).catch(error=>setUploadError(error.message)).then(()=>hideLoader());
        }if(phone != null){
            fs.collection('users').doc(uid).update({
                Phone:phone
            }).then(()=>{
                setSuccessMsg('Profile update Successful');
                hideLoader();
                setTimeout(()=>{
                    setSuccessMsg('');
                    },5000);
            }).catch(error=>setUploadError(error.message)).then(()=>hideLoader());
        }if (newphoto != null){
            const uploadTask=storage.ref(`profile-images/${now+newphoto.name}`).put(newphoto);
            uploadTask.on('state_changed',snapshot=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                console.log(progress);
            },error=>setUploadError(error.message),()=>{
                storage.ref('profile-images').child(now+newphoto.name).getDownloadURL().then(url=>{
                    fs.collection('users').doc(uid).update({
                        ProfileImage:url
                    }).then(()=>{
                    setnewPhoto(null);
                    setPhoto(url);
                    setSuccessMsg('Profile update Successful');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    hideLoader();
                    setTimeout(()=>{
                        setSuccessMsg('');
                        },5000);
                    }).catch(error=>setUploadError(error.message)).then(()=>hideLoader());
                })
            })
        }
        // fs.collection('users').doc(uid).update({
        //     FullName:updatename,
        //     Phone:updatephone
        // }).then(()=>{

        //     setSuccessMsg('Profile update Successful');
            
        // }).catch(error=>setUploadError(error.message));
    }
    

    return (
        <>
        <div className='container'>
        <br></br>
        <br></br>
        <h1>Edit Profile</h1>
        <hr></hr>
        {successMsg&&<>
        <div className='success-msg'>{
            successMsg}
            <br></br>
        </div>
        </>}
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className='product-img2'>
        <img src={photo} height="100" width="100" alt="profile-img"/>
        </div>    
        </div>  
           
        <form  className='form-group' autoComplete="off" onSubmit={updateData}>
            <label>Full Name</label>
            <input type="text" className='form-control' required
            onChange={(e) => setFullName(e.target.value)} value={name}></input>
            <br></br>
            {/* <label>Email</label>
            <input type="email" className='form-control' required
            onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <br></br> */}
            <label>Phone</label>
            <input type="phone" className='form-control' required onChange={(e) => setPhone(e.target.value)} value={phone} ></input>
            <br></br>
            {/* <label>Password</label>
            <input type="password" className='form-control' required
            onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <br></br>
            <label>Referral code</label>
            <input type="refcode" className='form-control' 
            onChange={(e) => setRefCode(e.target.value)} value={refcode}></input>
            <br></br> */}
            <label>Update Profile Image</label>
                <input type="file" id="file" className='form-control'onChange={handleProfileImg}></input> 
                {imageError&&<><br></br><div className='error-msg'>{imageError}</div></>}
                <br></br> 
            <div className='btn-box'>
            {/* <span>Already have an account? Login
            <Link to="login"> Here</Link>
            </span> */}
            <button type="submit" className='btn btn-success btn-md'>SUBMIT</button>
            </div>
        </form>
        <br></br>
        {uploadError&&<><div className='error-msg'>{uploadError}<br></br></div></>}
        <br></br>
        {loader}
        </div>

        </>
    );
}
